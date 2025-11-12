"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Building2, MapPin, Phone, MessageCircle, Trash2 } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"

// Mock data - in real app this would come from database
const mockBusinesses = [
  {
    id: 1,
    businessName: "Sonia's Biryani",
    category: "restaurant",
    location: "Near Burj Khalifa, Dubai",
    phone: "+971 50 123 4567",
    whatsapp: "+971 50 123 4567",
    description: "Authentic Pakistani biryani and traditional dishes",
  },
  {
    id: 2,
    businessName: "Elite Hair Salon",
    category: "salon",
    location: "Mall of Emirates, Dubai",
    phone: "+971 55 987 6543",
    whatsapp: "+971 55 987 6543",
    description: "Professional hair styling and beauty services",
  },
  {
    id: 3,
    businessName: "Tech Solutions Pro",
    category: "services",
    location: "Business Bay, Dubai",
    phone: "+971 52 456 7890",
    whatsapp: "",
    description: "IT consulting and software development services",
  },
]

const categoryColors = {
  restaurant: "bg-orange-100 text-orange-800",
  salon: "bg-pink-100 text-pink-800",
  events: "bg-purple-100 text-purple-800",
  retail: "bg-blue-100 text-blue-800",
  services: "bg-green-100 text-green-800",
  health: "bg-red-100 text-red-800",
  other: "bg-gray-100 text-gray-800",
}

export default function BusinessesPage() {
  const [businesses, setBusinesses] = useState(mockBusinesses)

  useEffect(() => {
    const registeredBusinesses = JSON.parse(localStorage.getItem("registeredBusinesses") || "[]")
    const allBusinesses = [...mockBusinesses, ...registeredBusinesses]
    setBusinesses(allBusinesses)
  }, [])

  const handleDeleteBusiness = (businessId: number | string) => {
    // Only allow deletion of registered businesses (not mock data)
    const registeredBusinesses = JSON.parse(localStorage.getItem("registeredBusinesses") || "[]")
    const updatedRegistered = registeredBusinesses.filter((business: any) => business.id !== businessId)
    localStorage.setItem("registeredBusinesses", JSON.stringify(updatedRegistered))

    // Update the displayed businesses
    const allBusinesses = [...mockBusinesses, ...updatedRegistered]
    setBusinesses(allBusinesses)
  }

  const canDelete = (businessId: number | string) => {
    // Only registered businesses (not mock data) can be deleted
    return !mockBusinesses.some((business) => business.id === businessId)
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
              <Building2 className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-semibold">Registered Businesses</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Businesses List */}
      <section className="py-8 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-foreground mb-2">All Businesses</h2>
            <p className="text-muted-foreground">
              {businesses.length} businesses registered in the WhatsApp discovery bot
            </p>
          </div>

          <div className="grid gap-6">
            {businesses.map((business) => (
              <Card key={business.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl">{business.businessName}</CardTitle>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge
                          variant="secondary"
                          className={categoryColors[business.category as keyof typeof categoryColors]}
                        >
                          {business.category.charAt(0).toUpperCase() + business.category.slice(1)}
                        </Badge>
                      </div>
                    </div>
                    {canDelete(business.id) && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteBusiness(business.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  {business.description && <CardDescription className="mt-2">{business.description}</CardDescription>}
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      {business.location}
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>{business.phone}</span>
                      </div>

                      {business.whatsapp && (
                        <div className="flex items-center gap-2 text-sm">
                          <MessageCircle className="h-4 w-4 text-green-600" />
                          <span className="text-green-600">WhatsApp Available</span>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {businesses.length === 0 && (
            <Card className="text-center py-12">
              <CardContent>
                <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <CardTitle className="mb-2">No Businesses Yet</CardTitle>
                <CardDescription className="mb-4">
                  Be the first to register your business with our WhatsApp bot
                </CardDescription>
                <Link href="/register">
                  <Button>Register Your Business</Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>
      </section>
    </div>
  )
}
