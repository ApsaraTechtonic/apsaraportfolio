import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Copy, CreditCard, Landmark, QrCode } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";

const CrowdFundingPage = () => {
  const [amount, setAmount] = useState<string>("500");
  
  // --- PAYMENT DETAILS ---
  const upiId = "9217843095@kotak";
  const accountName = "APSARA .";
  const paypalEmail = "apsara.20057@gmail.com";
  const razorpayUsername = "apsara3036";

  const usdAmount = (Number(amount || 0) / 83).toFixed(2);
  const upiString = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(accountName)}&cu=INR&am=${amount || 0}`;
  const paypalString = `https://www.paypal.com/myaccount/transfer/send`;
  const razorpayString = `https://razorpay.me/@${razorpayUsername}`;

  const handleCopy = (text: string, subject: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${subject} copied to clipboard!`);
  };

  return (
    <div className="bg-background min-h-screen text-foreground pt-24 pb-16">
      <Navbar />

      <main className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Support My Work
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            If you appreciate my digital experiences and open-source contributions, consider helping fund my late-night coding sessions! You can use any of the secure payment methods below.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="max-w-xl mx-auto mb-8 bg-card/60 p-6 rounded-2xl border border-foreground/10 text-center shadow-sm">
            <Label className="text-xl mb-4 block font-bold">How much would you like to contribute? (INR)</Label>
            <div className="relative max-w-xs mx-auto">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-muted-foreground w-4 text-xl">₹</span>
              <Input 
                type="number" 
                value={amount} 
                onChange={(e) => setAmount(e.target.value)} 
                className="text-center font-bold text-2xl h-14 pl-10"
                placeholder="500"
              />
            </div>
          </div>

          <Card className="glass-card border-none bg-card/60">
            <Tabs defaultValue="upi" className="w-full">
              <CardHeader className="p-0 pb-6 rounded-t-3xl overflow-hidden">
                <TabsList className="w-full h-14 bg-foreground/5 grid grid-cols-3 rounded-none p-1">
                  <TabsTrigger value="upi" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-bold h-full text-base transition-all">
                    <QrCode className="mr-2 h-5 w-5" />
                    UPI
                  </TabsTrigger>
                  <TabsTrigger value="bank" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-bold h-full text-base transition-all">
                    <Landmark className="mr-2 h-5 w-5" />
                    Netbanking
                  </TabsTrigger>
                  <TabsTrigger value="paypal" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-bold h-full text-base transition-all">
                    <CreditCard className="mr-2 h-5 w-5" />
                    PayPal
                  </TabsTrigger>
                </TabsList>
              </CardHeader>
              <CardContent className="pt-6 relative min-h-[400px]">
                
                {/* UPI TAB */}
                <TabsContent value="upi" className="space-y-8 animate-in fade-in-50 duration-500 m-0">
                  <div className="flex flex-col items-center justify-center space-y-6">
                    <div className="bg-white p-4 rounded-xl shadow-lg">
                      {/* Dynamically Generated QR Code */}
                      <QRCodeSVG 
                        value={upiString} 
                        size={256} 
                        className="rounded-lg"
                      />
                    </div>
                    <div className="flex items-center space-x-2 bg-foreground/5 px-6 py-4 rounded-xl border border-foreground/10 max-w-sm w-full">
                      <div className="flex-1 text-center">
                        <Label className="text-xs text-muted-foreground uppercase tracking-wider block mb-1">UPI ID</Label>
                        <p className="font-mono font-bold text-lg">{upiId}</p>
                      </div>
                      <Button variant="ghost" size="icon" onClick={() => handleCopy(upiId, "UPI ID")} className="text-primary hover:bg-primary/10">
                        <Copy size={20} />
                      </Button>
                    </div>
                    
                    <div className="w-full max-w-sm mt-4">
                      <a 
                        href={upiString} 
                        className="btn-primary block w-full text-center shadow-lg shadow-primary/20 py-4 text-lg"
                      >
                        Pay ₹{amount || 0} with UPI App
                      </a>
                    </div>
                  </div>
                </TabsContent>

                {/* NETBANKING TAB / RAZORPAY GATEWAY */}
                <TabsContent value="bank" className="space-y-6 animate-in fade-in-50 duration-500 m-0">
                  <div className="flex flex-col items-center justify-center h-full py-12 space-y-8">
                    <div className="bg-[#1a1a2e] text-white p-6 rounded-full shadow-lg shadow-[#1a1a2e]/20">
                      <Landmark size={48} className="text-[#3b82f6]" />
                    </div>
                    <div className="text-center max-w-sm w-full">
                      <h3 className="text-2xl font-bold mb-3">Netbanking Checkout</h3>
                      <p className="text-muted-foreground mb-8">
                        Process your contribution securely via our integrated Razorpay gateway. Supports all major Indian banks, credit cards, and debit cards.
                      </p>
                      
                      <a 
                        href={razorpayString}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-primary w-full shadow-lg shadow-primary/20 py-6 text-lg block"
                      >
                        Checkout ₹{amount || 0} via Razorpay
                      </a>
                    </div>
                  </div>
                </TabsContent>

                {/* PAYPAL TAB */}
                <TabsContent value="paypal" className="space-y-6 animate-in fade-in-50 duration-500 m-0">
                  <div className="flex flex-col items-center justify-center h-full py-12 space-y-8">
                    <div className="bg-[#003087] text-white p-6 rounded-full shadow-lg shadow-[#003087]/20">
                      <CreditCard size={48} />
                    </div>
                    <div className="text-center max-w-sm w-full">
                      <h3 className="text-2xl font-bold mb-3">PayPal Checkout</h3>
                      <p className="text-muted-foreground mb-8">
                        International supporters can securely fund my work by sending via PayPal to the email address below.
                      </p>
                      
                      <div className="flex items-center space-x-2 bg-foreground/5 px-6 py-4 rounded-xl border border-foreground/10 w-full mb-6">
                        <div className="flex-1 text-center">
                          <Label className="text-xs text-muted-foreground uppercase tracking-wider block mb-1">PayPal Email</Label>
                          <p className="font-mono font-bold">{paypalEmail}</p>
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => handleCopy(paypalEmail, "PayPal Email")} className="text-primary hover:bg-primary/10">
                          <Copy size={20} />
                        </Button>
                      </div>

                      <a 
                        href={paypalString}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-primary w-full shadow-lg shadow-primary/20 py-4 text-lg"
                      >
                        Checkout ${usdAmount} on PayPal
                      </a>
                    </div>
                  </div>
                </TabsContent>

              </CardContent>
            </Tabs>
          </Card>
        </motion.div>
      </main>
    </div>
  );
};

export default CrowdFundingPage;
