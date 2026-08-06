import Image from "next/image";

const milestones = [
  ["22", "Years old"],
  ["10+", "Editors on the team"],
  ["24–48h", "Typical turnaround"],
  ["$10k+", "Monthly milestone"],
];

export function FounderStory() {
  return <section className="founder" id="founder">
    <div className="founder-intro">
      <p className="eyebrow">Founder&apos;s note / Brozz Edits</p>
      <h2>From a small town.<br/><em>To a global edit.</em></h2>
      <p className="founder-lead">I&apos;m Vaibhav—founder of Brozz Edits. I&apos;m building a creative business from Nawabganj, near Bareilly, for creators and media companies around the world.</p>
    </div>
    <div className="founder-grid">
      <figure className="founder-portrait"><Image src="/images/vaibhav-founder.jpeg" alt="Vaibhav, founder of Brozz Edits" fill sizes="(max-width: 720px) 88vw, 36vw" priority={false}/><figcaption>VAIBHAV / FOUNDER &amp; CREATIVE LEAD</figcaption></figure>
      <div className="founder-story"><p>I started by editing videos for my own YouTube channel while I was still in school. The more I made, the more I cared about the invisible details: where a cut lands, how a story holds attention, and why some videos make people stay.</p><p>After working with different companies and learning the rhythm of real-world content, I made a New Year&apos;s resolution in January 2026: stop thinking like a freelancer and build a team that creators could genuinely rely on.</p><p>That became Brozz Edits. We don&apos;t sell inflated promises. We make sharp, thoughtful edits, communicate clearly, and deliver with pace. For new clients, the first edit is on us—because trust should be earned in the work.</p><p>My goal is simple: build a world-class creative company of 100+ editors, without losing the honesty and care that got us here.</p><div className="founder-signoff">— VAIBHAV SAXENA</div></div>
    </div>
    <div className="founder-milestones">{milestones.map(([value, label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}</div>
  </section>;
}
