import re
from datetime import datetime
from app.db.session import SessionLocal
from app.models.news import News
from app.models.project import Project
from app.models.partner import Partner


NEWS_ITEMS = [
    {
        "title": "New Safe Space Initiative Launched in Goma",
        "slug": "new-safe-space-initiative-launched-in-goma",
        "excerpt": "LULA has launched a new safe space initiative in Goma, providing a protective environment for vulnerable children.",
        "content": "<h2>Protecting Vulnerable Children in IDP Camps</h2><p>LULA has launched a new safe space initiative in Goma, providing a protective environment for over 500 vulnerable children in the Mugunga IDP camp. The facility includes educational spaces, counseling rooms, and recreational areas designed specifically for children who have experienced trauma.</p><h3>Comprehensive Support Services</h3><p>This initiative is part of our comprehensive child protection program, funded by UNICEF and the European Union with a budget of $1.2 million over three years. The safe space will serve as a hub for psychosocial support, education, and family tracing services.</p><p>The facility features:</p><ul><li>Four classrooms for accelerated learning programs</li><li>Two counseling rooms staffed by trained psychologists</li><li>A recreational area with sports equipment and games</li><li>A nutrition center providing daily meals</li><li>Family tracing and reunification services</li></ul><h3>Leadership Perspective</h3><p>\"Children who have experienced trauma need specialized support in a safe and nurturing environment,\" said Dr. Marie Nzigire, LULA's Executive Director. \"This safe space will provide not just physical protection, but also the emotional and educational support children need to heal, learn, and play.\"</p><h3>Community Impact</h3><p>The Mugunga camp hosts over 10,000 displaced families, with approximately 3,000 children under the age of 15. The new safe space represents a critical investment in the well-being and future of these vulnerable children.</p>",
        "image_url": "https://images.unsplash.com/photo-1602200938695-33e9dde52087?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxEUiUyMENvbmdvJTIwY2hpbGRyZW4lMjBjb21tdW5pdHklMjBzY2hvb2x8ZW58MXx8fHwxNzc5MzU1OTMwfDA&ixlib=rb-4.1.0&q=80&w=1080",
        "author": "LULA Communications",
        "published": True,
    },
    {
        "title": "1,000 Women Receive Vocational Training Certificates",
        "slug": "1000-women-receive-vocational-training-certificates",
        "excerpt": "Over 1,000 women graduated from LULA's vocational training programs across North and South Kivu provinces.",
        "content": "<h2>Celebrating Women's Economic Empowerment</h2><p>Over 1,000 women graduated from LULA's vocational training programs across North and South Kivu provinces in a historic milestone for women's empowerment in Eastern DRC. The women received comprehensive training in tailoring, agriculture, soap making, and small business management.</p><h3>Graduation Ceremony</h3><p>The graduation ceremony, held at the Bukavu Convention Center, was attended by local government officials, community leaders, and representatives from partner organizations including UNICEF, UN Women, and the Ministry of Social Affairs.</p><p>Each graduate received:</p><ul><li>A vocational training certificate recognized by the DRC government</li><li>A startup kit containing tools and materials valued at $200</li><li>Access to microfinance loans ranging from $100-$500</li><li>Six months of business mentorship and support</li></ul><h3>Life-Changing Impact</h3><p>\"I can now provide for my five children,\" said Amani Mukendi, one of the graduates from Bukavu. \"The skills I learned have changed my life and given me hope for the future. I've already received my first orders and am training two other women in my community.\"</p><h3>Program Results</h3><p>Since its launch in 2019, LULA's Women's Empowerment Program has trained over 3,500 women, with an impressive 78% of graduates successfully starting their own businesses. The program has created an estimated 5,000 jobs and generated over $2 million in income for women-led households.</p><h3>Looking Ahead</h3><p>Grace Mukenge, LULA's Women's Empowerment Officer, announced plans to expand the program to Ituri province in 2027, with a goal of training an additional 2,000 women over the next three years.</p>",
        "image_url": "https://images.unsplash.com/photo-1751130562241-3323a0362831?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwd29tZW4lMjBlbnRyZXByZW5ldXJzaGlwJTIwbWFya2V0fGVufDF8fHx8MTc3OTM1NTkzMHww&ixlib=rb-4.1.0&q=80&w=1080",
        "author": "LULA Communications",
        "published": True,
    },
    {
        "title": "Partnership Announcement with Global Health Initiative",
        "slug": "partnership-announcement-with-global-health-initiative",
        "excerpt": "LULA is proud to announce a three-year partnership with the Global Health Initiative to strengthen community health systems.",
        "content": "<h2>Strengthening Community Health Systems</h2><p>LULA is proud to announce a groundbreaking partnership with the Global Health Initiative (GHI) to strengthen community health systems across Eastern DRC. This three-year, $2.5 million partnership represents one of the largest health infrastructure investments in the region.</p><h3>Program Scope</h3><p>The partnership will support 25 health centers across North Kivu, South Kivu, and Ituri provinces, providing:</p><ul><li>Infrastructure rehabilitation and medical equipment</li><li>Training for 500 community health workers</li><li>Essential medicines and medical supplies</li><li>Mobile clinic services for remote communities</li><li>Health information management systems</li></ul><h3>Focus Areas</h3><p>The program will prioritize three critical areas:</p><p><strong>Maternal and Child Health:</strong> Improving access to prenatal care, safe delivery services, and postnatal support to reduce maternal and infant mortality rates.</p><p><strong>HIV Prevention and Treatment:</strong> Expanding HIV testing, treatment, and prevention services, with a focus on prevention of mother-to-child transmission (PMTCT).</p><p><strong>Disease Surveillance:</strong> Establishing early warning systems for infectious disease outbreaks and strengthening epidemic preparedness.</p><h3>Partnership Statement</h3><p>\"This partnership represents a significant step forward in our mission to ensure every community in Eastern DRC has access to quality healthcare,\" said Dr. Sarah Kabuo, LULA's Health Programs Manager. \"By combining GHI's technical expertise with LULA's deep community connections, we can create sustainable health systems that truly serve the needs of vulnerable populations.\"</p><h3>Expected Impact</h3><p>Over the three-year period, the program is expected to:</p><ul><li>Reach 150,000 people with essential health services</li><li>Train 500 community health workers</li><li>Conduct 50,000 HIV tests</li><li>Provide prenatal care to 20,000 pregnant women</li><li>Vaccinate 30,000 children</li></ul>",
        "image_url": "https://images.unsplash.com/photo-1551191003-9262a720b971?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwY29tbXVuaXR5JTIwaGVhbHRoJTIwb3V0cmVhY2h8ZW58MXx8fHwxNzc5MzU1OTMzfDA&ixlib=rb-4.1.0&q=80&w=1080",
        "author": "LULA Communications",
        "published": True,
    },
    {
        "title": "Mobile Clinic Brings Healthcare to Remote Villages",
        "slug": "mobile-clinic-brings-healthcare-to-remote-villages",
        "excerpt": "LULA's new mobile clinic has completed its first circuit through remote villages in Ituri province.",
        "content": "<h2>Reaching the Unreachable</h2><p>LULA's new mobile clinic has successfully completed its first circuit through 15 remote villages in Ituri province, providing essential healthcare services to over 3,000 people who previously had no access to medical care.</p><h3>Mobile Health Services</h3><p>The fully-equipped mobile clinic, funded by Médecins Sans Frontières (MSF) and the WHO, offers:</p><ul><li>General medical consultations</li><li>Childhood vaccinations</li><li>Prenatal and postnatal care</li><li>HIV testing and counseling</li><li>Treatment for common illnesses</li><li>Nutrition screening for children under 5</li><li>Health education sessions</li></ul><h3>First Circuit Results</h3><p>During its inaugural month of operation, the mobile clinic achieved remarkable results:</p><ul><li>3,247 patients treated</li><li>856 children vaccinated</li><li>412 women received prenatal care</li><li>189 people tested for HIV</li><li>95 cases of malnutrition identified and treated</li></ul><h3>Community Response</h3><p>\"Before the mobile clinic, we had to walk for six hours to reach the nearest health center,\" said Mama Fatuma, a village elder from Rwampara. \"Many people, especially pregnant women and sick children, couldn't make that journey. Now, healthcare comes to us. It's saving lives in our community.\"</p><h3>Sustainable Model</h3><p>The mobile clinic follows a systematic monthly route, visiting each of the 15 villages on a predictable schedule. This ensures continuous access to healthcare and allows for proper follow-up care for chronic conditions.</p><p>David Lukusa, LULA's Refugee Services Coordinator who oversees the mobile clinic program, explained: \"Consistency is key. People need to know when the clinic will arrive so they can plan for consultations and bring their children for vaccinations. We’re not just providing one-time care – we’re building a sustainable health system for these remote communities.\"</p><h3>Expansion Plans</h3><p>Based on the success of the pilot program, LULA plans to deploy two additional mobile clinics in North and South Kivu provinces by the end of 2026, extending quality healthcare to an estimated 15,000 additional people in remote and underserved areas.</p>",
        "image_url": "https://images.unsplash.com/photo-1608052026785-0bc249c733e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwcmVmdWdlZSUyMGNhbXAlMjBodW1hbml0YXJpYW58ZW58MXx8fHwxNzc5MzU1OTMxfDA&ixlib=rb-4.1.0&q=80&w=1080",
        "author": "LULA Communications",
        "published": True,
    },
]

PROJECTS = [
    {
        "title": "Safe Spaces for Children in Goma",
        "slug": "safe-spaces-for-children-in-goma",
        "description": "Creating protective environments for vulnerable children in refugee camps across North Kivu.",
        "content": "Creating protective environments for vulnerable children in refugee camps across North Kivu. Our safe spaces provide education, psychosocial support, and recreational activities in a secure environment where children can heal from trauma and build resilience.",
        "image_url": "https://images.unsplash.com/photo-1602200938695-33e9dde52087?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxEUiUyMENvbmdvJTIwY2hpbGRyZW4lMjBjb21tdW5pdHklMjBzY2hvb2x8ZW58MXx8fHwxNzc5MzU1OTMwfDA&ixlib=rb-4.1.0&q=80&w=1080",
        "location": "North Kivu",
        "latitude": None,
        "longitude": None,
        "status": "active",
        "published": True,
    },
    {
        "title": "Women Economic Empowerment",
        "slug": "women-economic-empowerment",
        "description": "Providing vocational training and microfinance to women-led households.",
        "content": "Providing vocational training and microfinance to women-led households. We train women in tailoring, agriculture, crafts, and entrepreneurship, and provide small loans and business mentorship to help them achieve economic independence.",
        "image_url": "https://images.unsplash.com/photo-1751130562241-3323a0362831?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwd29tZW4lMjBlbnRyZXByZW5ldXJzaGlwJTIwbWFya2V0fGVufDF8fHx8MTc3OTM1NTkzMHww&ixlib=rb-4.1.0&q=80&w=1080",
        "location": "South Kivu",
        "status": "active",
        "published": True,
    },
    {
        "title": "HIV Prevention & Treatment Support",
        "slug": "hiv-prevention-treatment-support",
        "description": "Community-based sexual and reproductive health education programs and health facility support.",
        "content": "Community-based sexual and reproductive health education programs and health facility support. We strengthen local health systems by training health workers, providing medical supplies, and conducting health education campaigns.",
        "image_url": "https://images.unsplash.com/photo-1551191003-9262a720b971?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwY29tbXVuaXR5JTIwaGVhbHRoJTIwb3V0cmVhY2h8ZW58MXx8fHwxNzc5MzU1OTMzfDA&ixlib=rb-4.1.0&q=80&w=1080",
        "location": "Ituri",
        "status": "active",
        "published": True,
    },
    {
        "title": "Community Health Workers Training",
        "slug": "community-health-workers-training",
        "description": "Rebuilding and equipping schools destroyed by conflict in North Kivu.",
        "content": "Rebuilding and equipping schools destroyed by conflict in North Kivu. This project includes construction of classrooms, provision of learning materials, teacher training, and establishment of school gardens for nutrition programs.",
        "image_url": "https://images.unsplash.com/photo-1744809495173-217ca4faa8bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwZ2lybHMlMjBlZHVjYXRpb24lMjBjbGFzc3Jvb218ZW58MXx8fHwxNzc5MzU1OTMxfDA&ixlib=rb-4.1.0&q=80&w=1080",
        "location": "Ituri",
        "status": "completed",
        "published": True,
    },
    {
        "title": "Refugee Camp Support Program",
        "slug": "refugee-camp-support-program",
        "description": "Comprehensive assistance including shelter, food, water, sanitation, and healthcare for displaced populations.",
        "content": "Comprehensive assistance including shelter, food, water, sanitation, and healthcare for displaced populations in camps across Eastern DRC. We also provide livelihood programs to help refugees become self-reliant.",
        "image_url": "https://images.unsplash.com/photo-1608052026785-0bc249c733e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwcmVmdWdlZSUyMGNhbXAlMjBodW1hbml0YXJpYW58ZW58MXx8fHwxNzc5MzU1OTMxfDA&ixlib=rb-4.1.0&q=80&w=1080",
        "location": "North Kivu",
        "status": "active",
        "published": True,
    },
    {
        "title": "Youth Vocational Training Center",
        "slug": "youth-vocational-training-center",
        "description": "Supporting small-scale farmers with training, seeds, tools, and market access.",
        "content": "Supporting small-scale farmers with training, seeds, tools, and market access. This project helps rural communities improve food security and generate income through sustainable agricultural practices.",
        "image_url": "https://images.unsplash.com/photo-1729005818676-b1fd299e8769?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxDb25nbyUyMHJ1cmFsJTIwZGV2ZWxvcG1lbnQlMjBhZ3JpY3VsdHVyZXxlbnwxfHx8fDE3NzkzNTU5MzJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
        "location": "North Kivu",
        "status": "planned",
        "published": True,
    },
]

PARTNERS = [
    {"name": "UNICEF", "logo_url": None, "description": "International partner supporting child protection and education", "website_url": None, "category": "international", "is_active": True},
    {"name": "WHO", "logo_url": None, "description": "International partner supporting health systems", "website_url": None, "category": "international", "is_active": True},
    {"name": "UNHCR", "logo_url": None, "description": "International partner supporting refugees and displaced populations", "website_url": None, "category": "international", "is_active": True},
    {"name": "World Vision", "logo_url": None, "description": "International partner supporting community resilience", "website_url": None, "category": "international", "is_active": True},
    {"name": "Save the Children", "logo_url": None, "description": "International partner supporting child welfare", "website_url": None, "category": "international", "is_active": True},
    {"name": "Oxfam", "logo_url": None, "description": "International partner supporting humanitarian response", "website_url": None, "category": "international", "is_active": True},
    {"name": "USAID", "logo_url": None, "description": "International partner supporting development programming", "website_url": None, "category": "international", "is_active": True},
    {"name": "Ministry of Health - DRC", "logo_url": None, "description": "Government partner strengthening healthcare systems", "website_url": None, "category": "government", "is_active": True},
    {"name": "Ministry of Social Affairs - DRC", "logo_url": None, "description": "Government partner supporting social protection", "website_url": None, "category": "government", "is_active": True},
    {"name": "North Kivu Provincial Government", "logo_url": None, "description": "Government partner supporting local services", "website_url": None, "category": "government", "is_active": True},
    {"name": "Goma Community Health Network", "logo_url": None, "description": "Local partner supporting community health", "website_url": None, "category": "local", "is_active": True},
    {"name": "Bukavu Women's Association", "logo_url": None, "description": "Local partner supporting women's empowerment", "website_url": None, "category": "local", "is_active": True},
]


def slugify(value: str) -> str:
    slug = re.sub(r"[^a-z0-9]+", "-", value.lower()).strip("-")
    return slug or "item"


def seed_content():
    db = SessionLocal()
    try:
        db.query(News).delete()
        db.query(Project).delete()
        db.query(Partner).delete()

        for item in NEWS_ITEMS:
            db.add(
                News(
                    title=item["title"],
                    slug=item["slug"],
                    excerpt=item["excerpt"],
                    content=item["content"],
                    image_url=item["image_url"],
                    author=item["author"],
                    published=item["published"],
                    published_at=datetime.utcnow(),
                )
            )

        for item in PROJECTS:
            db.add(
                Project(
                    title=item["title"],
                    slug=item["slug"],
                    description=item["description"],
                    content=item["content"],
                    image_url=item["image_url"],
                    location=item["location"],
                    latitude=item.get("latitude"),
                    longitude=item.get("longitude"),
                    status=item["status"],
                    published=item["published"],
                )
            )

        for item in PARTNERS:
            db.add(
                Partner(
                    name=item["name"],
                    logo_url=item["logo_url"],
                    description=item["description"],
                    website_url=item["website_url"],
                    category=item["category"],
                    is_active=item["is_active"],
                )
            )

        db.commit()
        print("Seeded news, projects, and partners successfully.")
    finally:
        db.close()


if __name__ == "__main__":
    seed_content()
