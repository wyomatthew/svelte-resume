import { z } from 'zod';

export const profileSchema = z.object({
  network: z.string().describe("e.g. Facebook or Twitter"),
  username: z.string().describe("e.g. neutralthoughts"),
  url: z.string().url().describe("e.g. http://twitter.example.com/neutralthoughts")
})

export const locationSchema = z.object({
  address: z.string().describe("To add multiple address lines, use \n. For example, 1234 Glücklichkeit Straße\nHinterhaus 5. Etage li."),
  postalCode: z.string(),
  city: z.string(),
  countryCode: z.string().describe("code as per ISO-3166-1 ALPHA-2, e.g. US, AU, IN"),
  region: z.string().describe("The general region where you live. Can be a US state, or a province, for instance.")
})

export const basicSchema = z.object({
  name: z.string(),
  label: z.string().describe("e.g. Web Developer"),
  image: z.string().url().describe("URL (as per RFC 3986) to a image in JPEG or PNG format"),
  email: z.string().email().describe("e.g. thomas@gmail.com"),
  phone: z.string().describe("Phone numbers are stored as strings so use any format you like, e.g. 712-117-2923Phone numbers are stored as strings so use any format you like, e.g. 712-117-2923"),
  url: z.string().url().describe("URL (as per RFC 3986) to your website, e.g. personal homepage"),
  summary: z.string().describe("Write a short 2-3 sentence biography about yourself"),
  location: locationSchema,
  profiles: z.array(profileSchema).describe("Specify any number of social networks that you participate in")
})

export const workSchema = z.object({
})
