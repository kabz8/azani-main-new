import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Ruler, Palette, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { insertCustomOrderSchema } from "@shared/schema";

const customOrderFormSchema = insertCustomOrderSchema.extend({
  measurements: z.object({
    chest: z.number().min(50).max(200),
    waist: z.number().min(40).max(180),
    hip: z.number().min(50).max(200),
    height: z.number().min(120).max(220).optional(),
    shoulderWidth: z.number().min(30).max(80).optional(),
    armLength: z.number().min(50).max(100).optional(),
  }),
});

type CustomOrderFormData = z.infer<typeof customOrderFormSchema>;

export default function CustomOrders() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<CustomOrderFormData>({
    resolver: zodResolver(customOrderFormSchema),
    defaultValues: {
      customerName: "",
      customerEmail: "",
      garmentType: "",
      fabricPreference: "",
      measurements: {
        chest: 0,
        waist: 0,
        hip: 0,
      },
      specialRequirements: "",
    },
  });

  const createOrderMutation = useMutation({
    mutationFn: async (data: CustomOrderFormData) => {
      return await apiRequest("POST", "/api/custom-orders", data);
    },
    onSuccess: () => {
      toast({
        title: "Order Submitted!",
        description: "We'll review your requirements and get back to you with a quote within 24 hours.",
      });
      form.reset();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to submit your order. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = async (data: CustomOrderFormData) => {
    setIsSubmitting(true);
    try {
      await createOrderMutation.mutateAsync(data);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="pt-24 pb-12 sm:pt-28 sm:pb-16 lg:py-20 bg-gradient-to-b from-muted to-background" data-testid="section-custom-hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-4 sm:mb-6" data-testid="text-custom-title">
            Custom Tailoring
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed" data-testid="text-custom-description">
            Every piece is crafted specifically for you. Our master tailors in Nairobi combine traditional techniques with modern precision to create clothing that fits perfectly and reflects your personal style.
          </p>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-12 sm:py-16 bg-card" data-testid="section-process">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center space-y-3 sm:space-y-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 border-2 border-primary rounded-full flex items-center justify-center mx-auto">
                <Ruler className="h-6 w-6 sm:h-7 sm:w-7 text-primary" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-foreground px-2" data-testid="text-process-measurements">Precise Measurements</h3>
              <p className="text-sm sm:text-base text-muted-foreground px-2">Detailed measurement guide ensures perfect fit every time</p>
            </div>
            
            <div className="text-center space-y-3 sm:space-y-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 border-2 border-primary rounded-full flex items-center justify-center mx-auto">
                <Palette className="h-6 w-6 sm:h-7 sm:w-7 text-primary" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-foreground px-2" data-testid="text-process-fabric">Fabric Selection</h3>
              <p className="text-sm sm:text-base text-muted-foreground px-2">Choose from premium African prints and luxury materials</p>
            </div>
            
            <div className="text-center space-y-3 sm:space-y-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 border-2 border-primary rounded-full flex items-center justify-center mx-auto">
                <Truck className="h-6 w-6 sm:h-7 sm:w-7 text-primary" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-foreground px-2" data-testid="text-process-delivery">Global Delivery</h3>
              <p className="text-sm sm:text-base text-muted-foreground px-2">Worldwide shipping with tracking and insurance</p>
            </div>
          </div>
        </div>
      </section>

      {/* Order Form Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-background" data-testid="section-order-form">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl sm:text-3xl font-serif" data-testid="text-form-title">Start Your Custom Order</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  {/* Personal Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="customerName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your name" {...field} data-testid="input-customer-name" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="customerEmail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="your@email.com" {...field} data-testid="input-customer-email" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Garment Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="garmentType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Garment Type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger data-testid="select-garment-type">
                                <SelectValue placeholder="Select garment type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="business-suit">Business Suit</SelectItem>
                              <SelectItem value="african-print-dress">African Print Dress</SelectItem>
                              <SelectItem value="kitenge-outfit">Kitenge Outfit</SelectItem>
                              <SelectItem value="ankara-set">Ankara Set</SelectItem>
                              <SelectItem value="traditional-wear">Traditional Wear</SelectItem>
                              <SelectItem value="formal-blazer">Formal Blazer</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="fabricPreference"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Fabric Preference</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger data-testid="select-fabric-preference">
                                <SelectValue placeholder="Choose fabric type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="african-print-kitenge">African Print (Kitenge)</SelectItem>
                              <SelectItem value="ankara-cotton">Ankara Cotton</SelectItem>
                              <SelectItem value="silk-blend">Silk Blend</SelectItem>
                              <SelectItem value="wool-suits">Wool (Suits)</SelectItem>
                              <SelectItem value="linen">Linen</SelectItem>
                              <SelectItem value="custom-fabric">Custom Fabric (I'll provide)</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Measurements */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-foreground" data-testid="text-measurements-title">Measurements (cm)</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <FormField
                        control={form.control}
                        name="measurements.chest"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Chest</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="92"
                                {...field}
                                onChange={(e) => field.onChange(Number(e.target.value))}
                                data-testid="input-chest"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="measurements.waist"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Waist</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="76"
                                {...field}
                                onChange={(e) => field.onChange(Number(e.target.value))}
                                data-testid="input-waist"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="measurements.hip"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Hip</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="98"
                                {...field}
                                onChange={(e) => field.onChange(Number(e.target.value))}
                                data-testid="input-hip"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* Special Requirements */}
                  <FormField
                    control={form.control}
                    name="specialRequirements"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Special Requirements</FormLabel>
                        <FormControl>
                          <Textarea
                            rows={4}
                            placeholder="Any specific design details, color preferences, or special requirements..."
                            {...field}
                            value={field.value || ""}
                            data-testid="textarea-special-requirements"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full py-5 sm:py-6 text-base sm:text-lg touch-manipulation"
                    disabled={isSubmitting}
                    data-testid="button-submit-order"
                  >
                    {isSubmitting ? "Submitting..." : "Get Custom Quote"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
