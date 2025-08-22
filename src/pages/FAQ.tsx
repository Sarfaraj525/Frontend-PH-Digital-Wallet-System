// src/pages/FAQ.tsx
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ: React.FC = () => {
  const faqData = [
    {
      question: "How do I register for the wallet?",
      answer:
        "You can register by clicking the Register button on the landing page and filling out your details. Choose your role as User or Agent.",
    },
    {
      question: "How do I reset my password?",
      answer:
        "Go to the Login page and click on 'Forgot Password'. Follow the instructions to reset your password via your registered email.",
    },
    {
      question: "Can I transfer money to another user?",
      answer:
        "Yes! Once logged in, go to your Dashboard, select 'Send Money', enter the recipient's email or phone, and complete the transaction.",
    },
    {
      question: "Is my money safe in the wallet?",
      answer:
        "Absolutely. We use industry-standard encryption and secure authentication to ensure your funds and personal data are safe.",
    },
    {
      question: "How can I become an Agent?",
      answer:
        "During registration, select the Agent role. Admin approval may be required to start handling cash-in/cash-out transactions.",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl text-sky-600 font-bold text-center mb-8">Frequently Asked Questions</h1>
      <Accordion type="single" collapsible className="space-y-4">
        {faqData.map((item, index) => (
          <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg">
            <AccordionTrigger className="text-lg font-medium">{item.question}</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">{item.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default FAQ;
