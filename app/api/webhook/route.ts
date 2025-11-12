import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

// Webhook verification (required by WhatsApp)
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const mode = searchParams.get("hub.mode")
  const token = searchParams.get("hub.verify_token")
  const challenge = searchParams.get("hub.challenge")

  // Verify webhook (use your own verify token)
  if (mode === "subscribe" && token === "your_verify_token") {
    return new NextResponse(challenge)
  }

  return new NextResponse("Forbidden", { status: 403 })
}

// Handle incoming WhatsApp messages
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Extract message data
    const entry = body.entry?.[0]
    const changes = entry?.changes?.[0]
    const value = changes?.value
    const messages = value?.messages

    if (messages && messages.length > 0) {
      const message = messages[0]
      const from = message.from // User's phone number
      const messageBody = message.text?.body || ""

      const response = await getAIResponse(messageBody)

      // Send response back to WhatsApp
      await sendWhatsAppMessage(from, response)
    }

    return NextResponse.json({ status: "success" })
  } catch (error) {
    console.error("Webhook error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

async function getAIResponse(userMessage: string): Promise<string> {
  try {
    // Business data (in a real app, this would come from a database)
    const businesses = [
      {
        name: "Sonia's Biryani",
        category: "Restaurant",
        location: "Near Burj Khalifa, Dubai",
        phone: "+971 50 123 4567",
        description: "Authentic Pakistani biryani and traditional dishes",
        whatsapp: "+971 50 123 4567",
      },
      {
        name: "Elite Hair Salon",
        category: "Salon",
        location: "Mall of Emirates, Dubai",
        phone: "+971 55 987 6543",
        description: "Professional hair styling and beauty services",
        whatsapp: "+971 55 987 6543",
      },
      {
        name: "Lydia's Beauty Saloon",
        category: "Salon",
        location: "Mazaya Shopping Centre Sheikh Zayed Road Near Burj Khalifa, Dubai",
        phone: "+971 43 434 821",
        description: "Beauty salon for men",
        whatsapp: "+971 50 123 4567",
      },
      {
        name: "Tech Solutions Pro",
        category: "Services",
        location: "Business Bay, Dubai",
        phone: "+971 52 456 7890",
        description: "IT consulting and software development services",
      },
    ]

    const { text } = await generateText({
      model: openai("gpt-4o"),
      system: `You are a helpful WhatsApp bot that helps people find local businesses in Dubai. 

Your role:
- Help users discover local businesses based on their needs
- Provide business recommendations with contact details
- Be friendly, concise, and helpful
- Always include phone numbers and WhatsApp availability when recommending businesses
- Format responses clearly for WhatsApp (use emojis sparingly, keep it readable)

Available businesses:
${JSON.stringify(businesses, null, 2)}

Guidelines:
- Match user queries to relevant business categories
- If multiple businesses match, show all relevant ones
- Include business name, location, phone, and brief description
- Mention WhatsApp availability when the business has it
- If no businesses match, suggest they can register their business
- Keep responses under 1000 characters for WhatsApp
- Be conversational and helpful`,
      prompt: `User message: "${userMessage}"

Please help the user find relevant local businesses or provide appropriate assistance.`,
    })

    return text
  } catch (error) {
    console.error("AI response error:", error)
    // Fallback response if AI fails
    return "Hi! I can help you find local businesses in Dubai. Try asking for restaurants, salons, or services. You can also register your business with us!"
  }
}

async function sendWhatsAppMessage(to: string, message: string) {
  const accessToken = process.env.WHATSAPP_ACCESS_TOKEN
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID

  if (!accessToken || !phoneNumberId) {
    console.error("Missing WhatsApp credentials")
    return
  }

  try {
    const response = await fetch(`https://graph.facebook.com/v18.0/${phoneNumberId}/messages`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to: to,
        text: { body: message },
      }),
    })

    if (!response.ok) {
      console.error("Failed to send WhatsApp message:", await response.text())
    }
  } catch (error) {
    console.error("Error sending WhatsApp message:", error)
  }
}
