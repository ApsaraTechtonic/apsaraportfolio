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

const CrowdFundingPage = () => {
  // --- PLACEHOLDER DATA ---
  // The user should replace these with their actual details later.
  const upiId = "9217843095@kotak";
  const upiQrSrc = "/upi-qr.png"; // User needs to save their QR here
  const bankDetails = {
    accountName: "APSARA .",
    accountNumber: "9551002389",
    accountType: "Savings",
    ifsc: "KKBK0000261",
    bankName: "Kotak Mahindra Bank",
    branchName: "GURGAON - M.G ROAD",
  };
  const paypalEmail = "apsara.20057@gmail.com";

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
                      {/* Using a placeholder image if custom QR is missing */}
                      <img 
                        src={upiQrSrc} 
                        alt="UPI QR Code" 
                        className="w-64 h-64 object-cover rounded-lg"
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
                  </div>
                </TabsContent>

                {/* NETBANKING TAB */}
                <TabsContent value="bank" className="space-y-6 animate-in fade-in-50 duration-500 m-0 max-w-md mx-auto">
                  <CardDescription className="text-center mb-6">
                    You can make a direct bank transfer using the details below.
                  </CardDescription>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Account Holder Name</Label>
                      <Input readOnly value={bankDetails.accountName} className="font-mono bg-foreground/5 border-foreground/10 focus-visible:ring-primary" />
                    </div>

                    <div className="space-y-2">
                      <Label>Account Type</Label>
                      <Input readOnly value={bankDetails.accountType} className="font-mono bg-foreground/5 border-foreground/10 focus-visible:ring-primary" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Account Number</Label>
                      <div className="flex gap-2">
                        <Input readOnly value={bankDetails.accountNumber} className="font-mono bg-foreground/5 border-foreground/10 focus-visible:ring-primary" />
                        <Button variant="outline" size="icon" onClick={() => handleCopy(bankDetails.accountNumber, "Account Number")} className="border-foreground/10 hover:bg-primary/10 hover:text-primary transition-colors">
                          <Copy size={18} />
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>IFSC Code</Label>
                      <div className="flex gap-2">
                        <Input readOnly value={bankDetails.ifsc} className="font-mono bg-foreground/5 border-foreground/10 focus-visible:ring-primary" />
                        <Button variant="outline" size="icon" onClick={() => handleCopy(bankDetails.ifsc, "IFSC Code")} className="border-foreground/10 hover:bg-primary/10 hover:text-primary transition-colors">
                          <Copy size={18} />
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Bank Name</Label>
                      <Input readOnly value={bankDetails.bankName} className="font-mono bg-foreground/5 border-foreground/10 focus-visible:ring-primary" />
                    </div>

                    <div className="space-y-2">
                      <Label>Branch Name</Label>
                      <Input readOnly value={bankDetails.branchName} className="font-mono bg-foreground/5 border-foreground/10 focus-visible:ring-primary" />
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
                        href={`https://paypal.com/`}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-primary w-full shadow-lg shadow-primary/20"
                      >
                        Open PayPal
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
