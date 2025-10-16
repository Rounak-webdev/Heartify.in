import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { useCart } from "@/hooks/useCart";
import { useToast } from "@/hooks/use-toast";
import Navbar from "./Navbar";

const budgetRanges = [
  { id: "499", label: "₹499", basePrice: 499 },
  { id: "799", label: "₹799", basePrice: 799 },
  { id: "999", label: "₹999", basePrice: 999 },
  { id: "1499", label: "₹1499", basePrice: 1499 },
  { id: "1999", label: "₹1999", basePrice: 1999 },
  { id: "2499", label: "₹2499", basePrice: 2499 },
];

const genders = ["Male", "Female", "Non-binary", "Prefer not to say"];
const ageGroups = ["0-12", "13-18", "19-30", "31-50", "50+"];
const occasions = ["Love ❤️", "Birthday 🎂", "Anniversary 💍", "Other"];

export default function CompactFormPage() {
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { toast } = useToast();

  const [showOptional, setShowOptional] = useState(false);
  const [formData, setFormData] = useState({
    // Required
    customerName: "",
    contactNumber: "",
    recipientName: "",
    relation: "",
    deliveryAddress: "",
    gender: "",
    ageGroup: "",
    selectedBudget: "",
    occasion: "",

    // Optional
    includeTshirt: false,
    tshirtSize: "",
    tshirtNeck: "",
    tshirtImage: null as File | null,

    includeArtwork: false,
    artworkType: "",
    artworkImage: null as File | null,

    personalMessage: "",
    remainAnonymous: false,
  });

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const calculateTotalPrice = () => {
    const selected = budgetRanges.find((b) => b.id === formData.selectedBudget);
    let total = selected?.basePrice || 0;
    if (formData.includeTshirt && formData.tshirtSize && formData.tshirtNeck) total += 299;
    if (formData.includeArtwork && formData.artworkType) total += 899;
    return total;
  };

  const handleSubmit = () => {
    if (!formData.customerName || !formData.contactNumber || !formData.recipientName || !formData.selectedBudget || !formData.deliveryAddress || !formData.occasion) {
      toast({
        title: "Missing Required Fields",
        description: "Please fill in all mandatory details.",
        variant: "destructive",
      });
      return;
    }

    const selectedBudgetRange = budgetRanges.find((b) => b.id === formData.selectedBudget);
    const totalPrice = calculateTotalPrice();

    addItem({
      recipientName: formData.recipientName,
      relation: formData.relation,
      selectedBudget: selectedBudgetRange?.label || "",
      basePrice: selectedBudgetRange?.basePrice || 0,
      extras: {
        apparel: formData.includeTshirt
          ? { price: 299, size: formData.tshirtSize, neck: formData.tshirtNeck, image: formData.tshirtImage }
          : undefined,
        artwork: formData.includeArtwork
          ? { price: 899, description: formData.artworkType, neck: formData.tshirtNeck || "", image: formData.artworkImage }
          : undefined,
      },
      totalPrice,
      formData,
      category: ""
    });

    toast({
      title: "Added to Cart!",
      description: `Gift for ${formData.recipientName} has been added to your cart.`,
    });

    navigate("/cart");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-6 max-w-3xl space-y-6">
        {/* Back */}
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="w-5 h-5" />
        </Button>

        {/* Required Details */}
        <Card>
          <CardHeader>
            <CardTitle>Required Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Your Name *</Label>
                <Input value={formData.customerName} onChange={(e) => handleChange("customerName", e.target.value)} required />
              </div>
              <div>
                <Label>Contact Number *</Label>
                <Input value={formData.contactNumber} onChange={(e) => handleChange("contactNumber", e.target.value)} required />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Recipient Name *</Label>
                <Input value={formData.recipientName} onChange={(e) => handleChange("recipientName", e.target.value)} required />
              </div>
              <div>
                <Label>Relation </Label>
                <Input value={formData.relation} onChange={(e) => handleChange("relation", e.target.value)} />
              </div>
            </div>
            <div>
              <Label>Delivery Address *</Label>
              <Textarea value={formData.deliveryAddress} onChange={(e) => handleChange("deliveryAddress", e.target.value)} required />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Gender</Label>
                <Select value={formData.gender} onValueChange={(v) => handleChange("gender", v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {genders.map((g) => (
                      <SelectItem key={g} value={g}>{g}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Age Group</Label>
                <Select value={formData.ageGroup} onValueChange={(v) => handleChange("ageGroup", v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {ageGroups.map((a) => (
                      <SelectItem key={a} value={a}>{a}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Occasion */}
            <div>
              <Label>Occasion *</Label>
              <Select value={formData.occasion} onValueChange={(v) => handleChange("occasion", v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {occasions.map((o) => (
                    <SelectItem key={o} value={o}>{o}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {formData.occasion === "Other" && (
                <Input className="mt-2" placeholder="Specify occasion" onChange={(e) => handleChange("occasion", e.target.value)} />
              )}
            </div>

            {/* Budget */}
            <div>
              <Label>Budget Range *</Label>
              <RadioGroup value={formData.selectedBudget} onValueChange={(v) => handleChange("selectedBudget", v)}>
                <div className="grid grid-cols-2 gap-2">
                  {budgetRanges.map((b) => (
                    <div key={b.id} className="flex items-center space-x-2 border p-2 rounded-md">
                      <RadioGroupItem value={b.id} id={b.id} />
                      <Label htmlFor={b.id}>{b.label}</Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>
          </CardContent>
        </Card>

        {/* Optional Details */}
        <Card>
          <CardHeader onClick={() => setShowOptional(!showOptional)} className="flex justify-between items-center cursor-pointer">
            <CardTitle>Optional Details</CardTitle>
            {showOptional ? <ChevronUp /> : <ChevronDown />}
          </CardHeader>
          {showOptional && (
            <CardContent className="space-y-6">
              {/* T-shirt */}
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox checked={formData.includeTshirt} onCheckedChange={(c) => handleChange("includeTshirt", c)} />
                  <Label>Include T-shirt (+₹299)</Label>
                </div>
                {formData.includeTshirt && (
                  <>
                    <Select value={formData.tshirtSize} onValueChange={(v) => handleChange("tshirtSize", v)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select size" />
                      </SelectTrigger>
                      <SelectContent>
                        {["S", "M", "L", "XL", "XXL"].map((s) => (
                          <SelectItem key={s} value={s}>{s}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    {formData.tshirtSize && (
                      <RadioGroup value={formData.tshirtNeck} onValueChange={(v) => handleChange("tshirtNeck", v)} className="space-y-2 mt-2">
                        <div className="flex items-center space-x-2 border p-2 rounded-md">
                          <RadioGroupItem value="Round Neck" id="round" />
                          <Label htmlFor="round">Round Neck 👕</Label>
                        </div>
                        <div className="flex items-center space-x-2 border p-2 rounded-md">
                          <RadioGroupItem value="Polo Neck" id="polo" />
                          <Label htmlFor="polo">Polo Neck 🧥</Label>
                        </div>
                      </RadioGroup>
                    )}

                    {formData.tshirtSize && formData.tshirtNeck && (
                      <div className="mt-2">
                        <Label>Upload Custom Design/Image</Label>
                        <Input type="file" accept="image/*" onChange={(e) => handleChange("tshirtImage", e.target.files?.[0] || null)} />
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Handcrafted Artwork */}
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox checked={formData.includeArtwork} onCheckedChange={(c) => handleChange("includeArtwork", c)} />
                  <Label>Handcrafted Artwork (+₹899)</Label>
                </div>
                {formData.includeArtwork && (
                  <>
                    <RadioGroup value={formData.artworkType} onValueChange={(v) => handleChange("artworkType", v)} className="space-y-2 mt-2">
                      <div className="flex items-center space-x-2 border p-2 rounded-md">
                        <RadioGroupItem value="Sketch" id="sketch" />
                        <Label htmlFor="sketch">Sketch 🖌️</Label>
                      </div>
                      <div className="flex items-center space-x-2 border p-2 rounded-md">
                        <RadioGroupItem value="Poster" id="poster" />
                        <Label htmlFor="poster">Poster 🖼️</Label>
                      </div>
                    </RadioGroup>

                    {formData.artworkType && (
                      <div className="mt-2">
                        <Label>Upload Reference Image</Label>
                        <Input type="file" accept="image/*" onChange={(e) => handleChange("artworkImage", e.target.files?.[0] || null)} />
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Personal Message */}
              <div>
                <Label>Personal Message</Label>
                <Textarea value={formData.personalMessage} onChange={(e) => handleChange("personalMessage", e.target.value)} />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox checked={formData.remainAnonymous} onCheckedChange={(c) => handleChange("remainAnonymous", c)} />
                <Label>Remain Anonymous</Label>
              </div>
            </CardContent>
          )}
        </Card>

        {/* Order Summary */}
        <Card className="bg-accent/10">
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span>Base ({formData.selectedBudget || "-"})</span>
              <span>₹{budgetRanges.find((b) => b.id === formData.selectedBudget)?.basePrice || 0}</span>
            </div>
            {formData.includeTshirt && formData.tshirtSize && formData.tshirtNeck && (
              <div className="flex justify-between text-sm">
                <span>T-shirt ({formData.tshirtSize}, {formData.tshirtNeck})</span>
                <span>₹299</span>
              </div>
            )}
            {formData.includeArtwork && formData.artworkType && (
              <div className="flex justify-between text-sm">
                <span>Artwork ({formData.artworkType})</span>
                <span>₹899</span>
              </div>
            )}
            <Separator />
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>₹{calculateTotalPrice()}</span>
            </div>
            <Button className="w-full mt-2" onClick={handleSubmit}>
              Add to Cart - ₹{calculateTotalPrice()}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}