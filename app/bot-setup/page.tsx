"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, MessageCircle, Copy, ExternalLink } from "lucide-react"
import Link from "next/link"

export default function BotSetupPage() {
  const [accessToken, setAccessToken] = useState("")
  const [phoneNumberId, setPhoneNumberId] = useState("")
  const [webhookUrl] = useState("https://your-app.vercel.app/api/webhook")

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    alert("Copied to clipboard!")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <MessageCircle className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-semibold">WhatsApp Bot Setup</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Setup Instructions */}
      <section className="py-8 px-4">
        <div className="container mx-auto max-w-4xl space-y-8">
          {/* Step 1: Get Access Token */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm">
                  1
                </span>
                Get WhatsApp Access Token
              </CardTitle>
              <CardDescription>
                Get your access token from Meta Business (Facebook) to connect your WhatsApp Business account.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-muted p-4 rounded-lg">
                <p className="text-sm text-muted-foreground mb-2">
                  1. Go to{" "}
                  <a
                    href="https://developers.facebook.com"
                    target="_blank"
                    className="text-primary hover:underline"
                    rel="noreferrer"
                  >
                    Meta for Developers
                  </a>
                </p>
                <p className="text-sm text-muted-foreground mb-2">2. Create a new app and add WhatsApp Business API</p>
                <p className="text-sm text-muted-foreground">3. Copy your temporary access token</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="accessToken">Access Token</Label>
                <div className="flex gap-2">
                  <Input
                    id="accessToken"
                    value={accessToken}
                    onChange={(e) => setAccessToken(e.target.value)}
                    placeholder="EAAVZBNEyoyu4BPFZCT3USIgzxT1PCPoyg0WujmmVY4sMPfsWBSt0ed5LnCLNpxtbDSDM9TYC7JOEq..."
                    type="password"
                  />
                  <Button variant="outline" size="icon" onClick={() => copyToClipboard(accessToken)}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Step 2: Phone Number */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm">
                  2
                </span>
                Configure Phone Number
              </CardTitle>
              <CardDescription>Set up your WhatsApp Business phone number for the bot.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phoneNumberId">Phone Number ID</Label>
                <Input
                  id="phoneNumberId"
                  value={phoneNumberId}
                  onChange={(e) => setPhoneNumberId(e.target.value)}
                  placeholder="776206705573116"
                />
              </div>
            </CardContent>
          </Card>

          {/* Step 3: Webhook */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm">
                  3
                </span>
                Setup Webhook
              </CardTitle>
              <CardDescription>Configure webhook URL to receive messages from WhatsApp.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Webhook URL</Label>
                <div className="flex gap-2">
                  <Input value={webhookUrl} readOnly />
                  <Button variant="outline" size="icon" onClick={() => copyToClipboard(webhookUrl)}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Use this URL in your WhatsApp Business API webhook configuration
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Test Bot */}
          <Card>
            <CardHeader>
              <CardTitle>Test Your Bot</CardTitle>
              <CardDescription>
                Once configured, test your bot by sending a message to your WhatsApp Business number.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-muted p-4 rounded-lg">
                <p className="font-medium mb-2">Try these test messages:</p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• "I want biryani"</li>
                  <li>• "Need a haircut"</li>
                  <li>• "Looking for events"</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-4">
            <Button className="flex-1">Save Configuration</Button>
            <Button variant="outline" className="gap-2 bg-transparent">
              <ExternalLink className="h-4 w-4" />
              View Documentation
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
