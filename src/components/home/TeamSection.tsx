import React from 'react';
import { motion } from 'framer-motion';

type TeamMember = {
  id: number;
  name: string;
  role: string;
  imageUrl: string;
};

const teamMembers: TeamMember[] = [ 
  {
    id: 1,
    name: 'Papu Kashyap',
    role: 'Event Coordinator',
    imageUrl: 'https://i.postimg.cc/13bYkzJN/Papu-fatty.png'
  },
  {
    id: 2,
    name: 'Anshuman Verma',
    role: 'Technical Mentor',
    imageUrl: 'https://hc-cdn.hel1.your-objectstorage.com/s/v3/d0808a0ae1a9994a6c4a40f79d24d6a2d4d5f21a_whatsapp_image_2025-06-17_at_4.04.12_pm.jpeg'
  },
  {
    id: 5,
    name: 'R Sri Sudarshan ',
    role: 'Backend Developer',
    imageUrl: 'https://i.postimg.cc/TwSfvqZf/sudershan-photo.png'
  },
  {
    id: 3,
    name: 'Yajat Singhal',
    role: 'Design Mentor',
    imageUrl: 'https://i.postimg.cc/CdSQhwFx/Yajatpic.jpg'
  },
  {
    id: 4,
    name: "Divya Sampath",
    role: 'Project Manager',
    imageUrl: 'https://i.postimg.cc/QMpzSgqH/divyamam-photo.png'
  },
  {
    id: 6,
    name: "Swathi R",
    role: 'Mentor',
    imageUrl: 'https://i.postimg.cc/jDw8g5hZ/Swathipic.jpg'
  }, 
  {
    id: 7,
    name: 'Saanvi Nyamagoud',
    role: 'Creative mentor',
    imageUrl: 'https://i.postimg.cc/zXJMJP17/Saanvi-Image2025-1.jpg'
  }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const TeamSection: React.FC = () => {
  const firstRows = teamMembers.slice(0, 4);
  const lastRow = teamMembers.slice(4);

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-12 text-white"
        >
          Meet Our Team
        </motion.h2>
        
        {/* First 4 members in a 4-column grid */}
        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8"
        >
          {firstRows.map((member) => (
            <TeamMemberCard key={member.id} member={member} />
          ))}
        </motion.div>

        {/* Last 3 members centered using flex */}
        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="flex justify-center flex-wrap gap-8"
        >
          {lastRow.map((member) => (
            <TeamMemberCard key={member.id} member={member} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const TeamMemberCard: React.FC<{ member: TeamMember }> = ({ member }) => {
  return (
    <motion.div 
      variants={item}
      whileHover={{ y: -10, transition: { duration: 0.3 } }}
      className="bg-slate-800/60 backdrop-blur-sm rounded-xl overflow-hidden shadow-xl border border-indigo-900/30 group w-full max-w-sm"
    >
      <div className="relative h-64 overflow-hidden">
        <img 
          src={member.imageUrl} 
          alt={member.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-70" />
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-semibold text-white mb-1">{member.name}</h3>
        <p className="text-indigo-400">{member.role}</p>
      </div>
    </motion.div>
  );
};

export default TeamSection;
