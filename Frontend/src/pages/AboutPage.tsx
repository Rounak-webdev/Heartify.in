import Navbar from '@/components/Navbar';
import { 
  Heart, 
  Lock, 
  Sparkles, 
  Gift, 
  ShieldCheck, 
  MousePointer,
  Star,
  ThumbsUp 
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-full mb-8">
              <Heart className="w-10 h-10 text-primary-foreground" />
            </div>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Why Heartify?
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              More than just gifts – we create magical moments that strengthen bonds and express emotions 
              in ways words cannot. Experience the future of thoughtful gifting.
            </p>
          </div>

          {/* Trust Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            <Card className="text-center group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Lock className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl">Anonymous Gifting</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Send surprises without revealing your name. Perfect for secret admirers and mysterious 
                  gestures that add excitement.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <ShieldCheck className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl">Confidence & Trust</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Secure payments, verified deliveries, and 100% privacy protection. Every transaction is 
                  safeguarded with care.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl">Personalized Surprises</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Gifts crafted for emotions, occasions, and your personal touch. Every selection is 
                  designed to connect deeply.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* New Why Trust Us Section */}
          <div className="bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5 rounded-3xl p-12 text-center mb-20">
            <h2 className="text-3xl font-bold mb-10 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Why You Can Trust Heartify
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Surprise Element",
                  desc: "Mystery boxes & surprise gifts create excitement for both sender and receiver.",
                  icon: Gift,
                  colors: "from-pink-500 to-rose-500",
                },
                {
                  title: "No Decision Fatigue",
                  desc: "Struggle to choose? Leave it to us. We remove stress & make gifting effortless.",
                  icon: MousePointer,
                  colors: "from-indigo-500 to-purple-500",
                },
                {
                  title: "Unique Gifting Experience",
                  desc: "Not just products – we make gifting fun, memorable, and emotional.",
                  icon: Sparkles,
                  colors: "from-yellow-500 to-orange-500",
                },
                {
                  title: "Personalization by Category",
                  desc: "Foodie, fitness lover, bookworm? Choose a category that fits their personality.",
                  icon: Heart,
                  colors: "from-red-500 to-pink-500",
                },
                {
                  title: "Curated Quality",
                  desc: "Every surprise is carefully curated. Premium quality is our promise.",
                  icon: Star,
                  colors: "from-green-500 to-emerald-500",
                },
                {
                  title: "Satisfaction Guarantee",
                  desc: "We stand by our service. Trust, security & care are at the heart of Heartify.",
                  icon: ThumbsUp,
                  colors: "from-blue-500 to-cyan-500",
                },
              ].map((item, idx) => (
                <Card
                  key={idx}
                  className="text-center group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20"
                >
                  <CardHeader>
                    <div
                      className={`w-14 h-14 bg-gradient-to-br ${item.colors} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}
                    >
                      <item.icon className="w-7 h-7 text-white" />
                    </div>
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{item.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Mission Statement */}
          <div className="bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10 rounded-3xl p-12 text-center">
            <div className="max-w-4xl mx-auto">
              <div className="flex justify-center mb-6">
                <div className="flex space-x-2">
                  <Heart className="w-6 h-6 text-primary animate-pulse" />
                  <Sparkles className="w-6 h-6 text-accent animate-pulse delay-100" />
                  <Gift className="w-6 h-6 text-primary animate-pulse delay-200" />
                </div>
              </div>
              <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Our Mission
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                At Heartify, we understand that the perfect gift isn't just about the item – it's about 
                the thought, care, and love behind it. Our mission is to help you express your deepest 
                feelings through thoughtfully curated gifts that speak directly to your loved one's heart, 
                creating moments of pure joy and connection that last a lifetime.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}