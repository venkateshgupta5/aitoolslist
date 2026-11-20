import { z } from "zod";

export const leadSchema = z.object({
  productId: z.string().min(1, "Product is required"),
  productSlug: z.string().min(1),
  fullName: z.string().min(2, "Please enter your full name").max(150),
  email: z.string().email("Enter a valid work email").max(255),
  location: z.string().min(2, "Location is required").max(150),
  profession: z.string().min(2, "Profession is required").max(120),
  message: z.string().max(2000).optional().or(z.literal("")),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Consent is required to submit" }),
  }),
});

export type LeadInput = z.infer<typeof leadSchema>;

export const listingSchema = z.object({
  companyName: z.string().min(2, "Company name is required").max(200),
  productName: z.string().min(2, "Product name is required").max(200),
  websiteUrl: z.string().url("Enter a valid URL").max(500),
  contactName: z.string().min(2, "Contact name is required").max(150),
  email: z.string().email("Enter a valid email").max(255),
  categorySlug: z.string().min(1, "Choose a category"),
  description: z.string().max(2000).optional().or(z.literal("")),
});

export type ListingInput = z.infer<typeof listingSchema>;
