import { z } from 'zod';

export const iso8601Schema = z
	.string()
	.regex(/^([1-2][0-9]{3}-[0-1][0-9]-[0-3][0-9]|[1-2][0-9]{3}-[0-1][0-9]|[1-2][0-9]{3})$/)
	.describe('ISO8601 date format: YYYY, YYYY-MM, or YYYY-MM-DD');

export const profileItemSchema = z.object({
	network: z.string().describe('e.g. Facebook or Twitter'),
	username: z.string().describe('e.g. neutralthoughts'),
	url: z.string().url().describe('e.g. http://twitter.example.com/neutralthoughts')
});

export const locationSchema = z.object({
	address: z.string().describe('To add multiple address lines, use \\n.'),
	postalCode: z.string(),
	city: z.string(),
	countryCode: z.string().describe('ISO-3166-1 ALPHA-2 code, e.g. US, AU, IN'),
	region: z.string().describe('The general region where you live, e.g., a US state or province.')
});

export const basicsSchema = z.object({
	name: z.string(),
	label: z.string().describe('e.g. Web Developer'),
	image: z.string().url().describe('URL to a JPEG or PNG image'),
	email: z.string().email().describe('e.g. thomas@gmail.com'),
	phone: z.string().describe('Phone number in any format, e.g. 712-117-2923'),
	url: z.string().url().describe('URL to your website, e.g., personal homepage'),
	summary: z.string().describe('Short biography, 2-3 sentences.'),
	location: locationSchema.optional(),
	profiles: z.array(profileItemSchema).optional()
});

export const workItemSchema = z.object({
	name: z.string().describe('e.g. Facebook'),
	location: z.string().describe('e.g. Menlo Park, CA'),
	description: z.string().describe('e.g. Social Media Company'),
	position: z.string().describe('e.g. Software Engineer'),
	url: z.string().url().describe('e.g. http://facebook.example.com'),
	startDate: iso8601Schema.optional(),
	endDate: iso8601Schema.optional(),
	summary: z.string().describe('Give an overview of your responsibilities at the company'),
	highlights: z
		.array(
			z.string().describe('e.g. Increased profits by 20% from 2011-2012 through viral advertising')
		)
		.optional()
});

export const volunteerItemSchema = z.object({
	organization: z.string().describe('e.g. Facebook'),
	position: z.string().describe('e.g. Software Engineer'),
	url: z.string().url().describe('e.g. http://facebook.example.com'),
	startDate: iso8601Schema.optional(),
	endDate: iso8601Schema.optional(),
	summary: z.string().describe('Give an overview of your responsibilities at the company'),
	highlights: z
		.array(
			z.string().describe('e.g. Increased profits by 20% from 2011-2012 through viral advertising')
		)
		.optional()
});

export const educationItemSchema = z.object({
	institution: z.string().describe('e.g. Massachusetts Institute of Technology'),
	url: z.string().url().describe('e.g. http://facebook.example.com'),
	area: z.string().describe('e.g. Arts'),
	studyType: z.string().describe('e.g. Bachelor'),
	startDate: iso8601Schema.optional(),
	endDate: iso8601Schema.optional(),
	score: z.string().describe('grade point average, e.g. 3.67/4.0'),
	courses: z.array(z.string().describe('e.g. H1302 - Introduction to American history')).optional()
});

export const awardItemSchema = z.object({
	title: z.string().describe('e.g. One of the 100 greatest minds of the century'),
	date: iso8601Schema.optional(),
	awarder: z.string().describe('e.g. Time Magazine'),
	summary: z.string().describe('e.g. Received for my work with Quantum Physics')
});

export const certificateItemSchema = z.object({
	name: z.string().describe('e.g. Certified Kubernetes Administrator'),
	date: iso8601Schema.optional(),
	url: z.string().url().describe('e.g. http://example.com'),
	issuer: z.string().describe('e.g. CNCF')
});

export const publicationItemSchema = z.object({
	name: z.string().describe('e.g. The World Wide Web'),
	publisher: z.string().describe('e.g. IEEE, Computer Magazine'),
	releaseDate: iso8601Schema.optional(),
	url: z
		.string()
		.url()
		.describe('e.g. http://www.computer.org.example.com/csdl/mags/co/1996/10/rx069-abs.html'),
	summary: z
		.string()
		.describe('Short summary of publication. e.g. Discussion of the World Wide Web, HTTP, HTML.')
});

export const skillItemSchema = z.object({
	name: z.string().describe('e.g. Web Development'),
	level: z.string().describe('e.g. Master'),
	keywords: z.array(z.string().describe('e.g. HTML')).optional()
});

export const languageItemSchema = z.object({
	language: z.string().describe('e.g. English, Spanish'),
	fluency: z.string().describe('e.g. Fluent, Beginner')
});

export const interestItemSchema = z.object({
	name: z.string().describe('e.g. Philosophy'),
	keywords: z.array(z.string().describe('e.g. Friedrich Nietzsche')).optional()
});

export const referenceItemSchema = z.object({
	name: z.string().describe('e.g. Timothy Cook'),
	reference: z
		.string()
		.describe(
			'e.g. Joe blogs was a great employee, who turned up to work at least once a week. He exceeded my expectations when it came to doing nothing.'
		)
});

export const projectItemSchema = z.object({
	name: z.string().describe('e.g. The World Wide Web'),
	description: z.string().describe('Short summary of project. e.g. Collated works of 2017.'),
	highlights: z.array(z.string().describe('e.g. Directs you close but not quite there')).optional(),
	keywords: z.array(z.string().describe('e.g. AngularJS')).optional(),
	startDate: iso8601Schema.optional(),
	endDate: iso8601Schema.optional(),
	url: z
		.string()
		.url()
		.describe('e.g. http://www.computer.org/csdl/mags/co/1996/10/rx069-abs.html'),
	roles: z.array(z.string().describe('e.g. Team Lead, Speaker, Writer')).optional(),
	entity: z
		.string()
		.describe(
			"Specify the relevant company/entity affiliations e.g. 'greenpeace', 'corporationXYZ'"
		),
	type: z
		.string()
		.describe(" e.g. 'volunteering', 'presentation', 'talk', 'application', 'conference'")
});

export const metaSchema = z.object({
	canonical: z.string().url().describe('URL to latest version of this document'),
	version: z.string().describe('A version field which follows semver - e.g. v1.0.0'),
	lastModified: z.string().optional().describe('Using ISO 8601 with YYYY-MM-DDThh:mm:ss')
});

export const resumeSchema = z.object({
	basics: basicsSchema.optional(),
	work: z.array(workItemSchema).optional(),
	volunteer: z.array(volunteerItemSchema).optional(),
	education: z.array(educationItemSchema).optional(),
	awards: z.array(awardItemSchema).optional(),
	certificates: z.array(certificateItemSchema).optional(),
	publications: z.array(publicationItemSchema).optional(),
	skills: z.array(skillItemSchema).optional(),
	languages: z.array(languageItemSchema).optional(),
	interests: z.array(interestItemSchema).optional(),
	references: z.array(referenceItemSchema).optional(),
	projects: z.array(projectItemSchema).optional(),
	meta: metaSchema
});
