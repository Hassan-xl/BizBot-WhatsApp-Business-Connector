import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageCircle, MapPin, Users, Zap } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageCircle className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold text-foreground">BizBot</h1>
            </div>
            <nav className="flex gap-4">
              <Link href="/businesses">
                <Button variant="ghost">View Businesses</Button>
              </Link>
              <Link href="/register">
                <Button variant="outline">Register Business</Button>
              </Link>
              <Link href="/bot-setup">
                <Button>Setup Bot</Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <h2 className="text-4xl font-bold text-foreground mb-6">
            Connect Customers to Local Businesses via WhatsApp
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Simple WhatsApp bot that helps people discover restaurants, salons, events, and more. Businesses get
            customers, you earn revenue.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" className="gap-2">
                <Users className="h-5 w-5" />
                Register Your Business
              </Button>
            </Link>
            <Link href="/bot-setup">
              <Button variant="outline" size="lg" className="gap-2 bg-transparent">
                <Zap className="h-5 w-5" />
                Setup WhatsApp Bot
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <h3 className="text-3xl font-bold text-center text-foreground mb-12">How It Works</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-6 w-6 text-primary" />
                  Businesses Register
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Local businesses sign up with their details, category, and location. Simple form, instant listing.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-6 w-6 text-primary" />
                  Users Ask Bot
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Customers message your WhatsApp bot: "I want biryani" or "Need a haircut". Bot instantly replies with
                  matches.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-6 w-6 text-primary" />
                  Connections Made
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Bot shares business details and contact info. Customers get what they need, businesses get customers.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center max-w-2xl">
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="text-2xl">Ready to Start?</CardTitle>
              <CardDescription>Get your WhatsApp business discovery bot running in minutes</CardDescription>
            </CardHeader>
            <CardContent className="flex gap-4 justify-center">
              <Link href="/register">
                <Button size="lg">Add Your Business</Button>
              </Link>
              <Link href="/bot-setup">
                <Button variant="outline" size="lg">
                  Configure Bot
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
