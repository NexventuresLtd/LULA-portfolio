from app.db.session import SessionLocal
from app.models.impact_story import ImpactStory


IMPACT_STORIES = [
    {
        "title": "Amani Kabila",
        "quote": "LULA gave me hope and a future.",
        "story": "Before joining LULA's women's empowerment program, I struggled to provide for my four children. Through the vocational training in tailoring, I gained skills that changed everything. Today, I run a successful tailoring business employing three other women from my community.",
        "person_name": "Amani Kabila",
        "person_role": "Entrepreneur & Program Graduate",
        "image_url": "https://images.unsplash.com/photo-1509099863731-ef4bff19e808",
        "featured": True,
        "published": True,
    },
    {
        "title": "Jean-Pierre Mutombo",
        "quote": "The trust our community has in LULA's programs makes my work possible.",
        "story": "As a community health worker trained by LULA, I've seen firsthand how health education transforms lives. In our village, we've reduced infant mortality by 40% and increased HIV testing rates by 300%.",
        "person_name": "Jean-Pierre Mutombo",
        "person_role": "Community Health Worker",
        "image_url": "https://images.unsplash.com/photo-1515657241610-a6b33f0f6c5a",
        "featured": True,
        "published": True,
    },
    {
        "title": "Grace Nyota",
        "quote": "Now I lead a youth peace initiative that brings together over 200 young people.",
        "story": "Growing up in a conflict zone, I never thought I could have a voice in my community. LULA's youth leadership program taught me advocacy, conflict resolution, and project management.",
        "person_name": "Grace Nyota",
        "person_role": "Youth Leader",
        "image_url": "https://images.unsplash.com/photo-1524414621493-7dec026782c3",
        "featured": False,
        "published": True,
    },
    {
        "title": "Emmanuel Nkunda",
        "quote": "LULA gave my child her childhood back.",
        "story": "When my daughter was placed in LULA's child protection program, she was traumatized and withdrawn. The counseling, education support, and safe space they provided helped her heal. Today she's thriving in school and dreams of becoming a doctor.",
        "person_name": "Emmanuel Nkunda",
        "person_role": "Parent",
        "image_url": "https://images.unsplash.com/photo-1515658323406-25d61c141a6e",
        "featured": False,
        "published": True,
    },
]


def seed_impact_stories():
    db = SessionLocal()
    try:
        for item in IMPACT_STORIES:
            existing = db.query(ImpactStory).filter(ImpactStory.title == item["title"]).first()
            if existing:
                existing.quote = item["quote"]
                existing.story = item["story"]
                existing.person_name = item["person_name"]
                existing.person_role = item["person_role"]
                existing.image_url = item["image_url"]
                existing.featured = item["featured"]
                existing.published = item["published"]
            else:
                db.add(
                    ImpactStory(
                        title=item["title"],
                        quote=item["quote"],
                        story=item["story"],
                        person_name=item["person_name"],
                        person_role=item["person_role"],
                        image_url=item["image_url"],
                        featured=item["featured"],
                        published=item["published"],
                    )
                )

        db.commit()
        print(f"Seeded {len(IMPACT_STORIES)} impact stories.")
    finally:
        db.close()


if __name__ == "__main__":
    seed_impact_stories()
