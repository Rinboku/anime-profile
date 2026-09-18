export interface Item {
  id: string;
  text: string;
}

export interface Subscale {
  id: string;
  label: string;
  items: Item[];
}

export interface TestData {
  title: string;
  subscales: Subscale[];
}

// Exemplu: Dark Tetrad
export const DARK_TETRAD: TestData = {
  title: "Dark Tetrad Scale",
  subscales: [
    {
      id: 'machiavellianism',
      label: 'Machiavelism',
      items: [
        { id: 'm1', text: 'It\'s not wise to tell your secrets.' },
        { id: 'm2', text: 'I like to use clever manipulations to get my way.' },
        { id: "m3", text: "Whatever it takes, you must get the important people on your side. "},
        { id: "m4", text: "Avoid direct conflict with others because they may be useful in the future. "},
        { id: "m5", text: "Keep a low profile until you need to strike. "},
        { id: "m6", text: "There are several ways to get help from people without them knowing it. "},
        { id: "m7", text: "Make sure your plans benefit you, not others. "}
      ]
    },
    {
      id: "narcissism",
      label: "Narcissism",
      items: [
        { id: "n1", text: "People see me as a natural leader. "},
        { id: "n2", text: "I hate being the center of attention. "},
        { id: "n3", text: "Many group activities tend to be dull without me."},
        { id: "n4", text: "I know that I am special because everyone keeps telling me so."},
        { id: "n5", text: "I like to get acquainted with important people."},
        { id: "n6", text: "I feel embarrased if someone compliments me."},
        { id: "n7", text: "I have been compared to famous people."}
      ]
    },
    {
      id: "psychopathy",
      label:"Psychopathy",
      items: [
        {id: "p1", text: "I like to get revenge on authorities. "},
        {id: "p2", text: "I avoid dangerous situations."},
        {id: "p3", text: "Payback needs to be quick and nasty. "},
        {id: "p4", text: "People often say I'm out of control."},
        {id: "p5", text: "It's true that I can be mean to others. "},
        {id: "p6", text: "People who mess with me always regret it."},
        {id: "p7", text: "I have never been in trouble with the law. "}
      ]
    },
    // Adaugă restul subscalelor...
  ]
};



export const BIG_FIVE: TestData = {
  title: "Big Five Subscales",
  subscales: [
    {
      id: "extraversion",
      label:"Extraversion",
      items: [
        {id: "ex1", text: "Is outgoing, sociable. " },
        {id: "ex2", text: "Has an assertive personality."},
        {id: "ex3", text: "Rarely feels excited or eager. " },
        {id: "ex4", text: "Tends to be quiet. " },
        {id: "ex5", text: "Is dominant, acts as a leader." },
        {id: "ex6", text: "Is less active than other people. " },

      ]
    },
    {
     id: "agreeableness",
      label:"Agreeableness",
      items: [
        {id: "ag1", text: "Is compassionate has a soft heart." },
        {id: "ag2", text: "Is respectful, treats others with respect. "},
        {id: "ag3", text: "Tends to find fault with others. " },
        {id: "ag4", text: "Feels little sympathy for others. " },
        {id: "ag5", text: "Starts quarrels with others." },
        {id: "ag6", text: "Has a forgiving nature. " },

      ]
    },
    {
      id: "conscientiousness",
      label:"Conscientiousness",
      items: [
        {id: "co1", text: "Tends to be disorganized." },
        {id: "co2", text: "Tends to be lazy."},
        {id: "co3", text: "Is dependable, steady." },
        {id: "co4", text: "Keeps things nest and tidy." },
        {id: "co5", text: "Has difficulty getting started on tasks. " },
        {id: "co6", text: "Can be somewhat careless." },

      ]
    },
    {
      id: "neuroticism",
      label:"Neuroticism",
      items: [
        {id: "ne1", text: "Is relaxed, handles stress well." },
        {id: "ne2", text: "Stays optimistic after experiencing a setback."},
        {id: "ne3", text: "Is moody, has up and down mood swings. " },
        {id: "ne4", text: "Worries a lot. " },
        {id: "ne5", text: "Feels secure, comfortable with self. " },
        {id: "ne6", text: "Is emotionally stable, not easily upset. " }
      ]
    },

    {
      id: "open-mindedness",
      label:"Open-Mindedness",
      items: [
        {id: "om1", text: "Has few artistic interests. " },
        {id: "om2", text: "Is curious about many different things. "},
        {id: "om3", text: "Is inventive, finds clever ways to do things. " },
        {id: "om4", text: "Fascinated by art music or literature. " },
        {id: "om5", text: "Avoids intellectual, philosophical discussions. " },
        {id: "om6", text: "Has little creativity. " }
      ]
    }
  ]
}

export const UPPS_P: TestData = {
  title: "UPPS-P",
  subscales: [
    {
      id: "premeditation",
      label: "Premedidation",
      items: [
        {id: "pre1", text: "I have a reserved and cautious attitude toward life. "},
        {id: "pre2", text: "My thinking is usually careful and purposeful."},
        {id: "pre3", text: "I tent to value and follow a rational `sensible` approach to things. "},
        {id: "pre4", text: "I usually make up my mind through careful reasoning."}
      ]
    },

    {
      id: "urgency",
      label: "Urgency",
      items: [
        {id: "urg1", text: "I have trouble controlling my impulses."},
        {id: "urg2", text: "I have trouble resisting my cravings (for food, cigarettes, etc.)."},
        {id: "urg3", text: "When I feel bad, I will often do things I later regret in order to make myself feel better now."},
        {id: "urg4", text: "When I am upset, I often act without thinking. "}
      ]
    },

    {
      id: "sensation seeking",
      label: "Sensation Seeking",
      items: [
        {id: "ses1", text: "I generally seek new and exciting experiences and sensations."},
        {id: "ses2", text: "I rather enjoy taking risks. "},
        {id: "ses3", text: "I'll try anything once."},
        {id: "ses4", text: "I like sports and games in which you have to choose your next move very quickly."}
      ]
    },

    {
      id: "urgency positive",
      label: "Urgency Positive",
      items: [
        {id: "urp1", text: "When I am very happy, I can't seem to help but do high-risk things. "},
        {id: "urp2", text: "When I am in a great mood, I tend to get into situations that could cause me problems. "},
        {id: "urp3", text: "When I am very happy, I feel like it is okay to give in to cravings or overindulge."},
        {id: "urp4", text: "Others would say I make bad choices when I am extremely happy. "}
      ]
    },

    {
      id: "perseverance",
      label: "Perseverance",
      items: [
        {id: "per1", text: "I tend to give up easily."},
        {id: "per2", text: "I am a person who always gets the job done."},
        {id: "per3", text: "I almost always finish projects that I start. "},
        {id: "per4", text: "Unfinished tasks really bother me.  "}
      ]
    }
  ]

} 

export const Need_For_Cognition_18: TestData ={
  title: "Need for Cognition Scale 18",
  subscales:[
    {
      id: "cognition",
      label:"Need for Cognition",
      items: [
        {id: "nfc1", text: "I would prefer complex to simple problems."},
        {id: "nfc2", text: "I like to have the responsibility of handling a situation that requires a lot of thinking."},
        {id: "nfc3", text: "Thinking is not my idea of fun. "},
        {id: "nfc4", text: "I would rather do something that requires little thought than something that is sure to challenge my thinking abilities."},
        {id: "nfc5", text: "I try to anticipate and avoid situations where is likely a chance I will have to think in depth about something."},
        {id: "nfc6", text: "I find satisfaction in deliberating hard and for long hours."},
        {id: "nfc7", text: "I only think as hard as I have to. "},
        {id: "nfc8", text: "I prefer to think about small, daily projects to long-term ones. "},
        {id: "nfc9", text: "I like tasks that require little thought once I've learned them."},
        {id: "nfc10", text: "The idea of relying on thought to make my way to the top appeals to me."},
        {id: "nfc11", text: "I really enjoy a task that involves coming up with new solutions to problems. "},
        {id: "nfc12", text: "Learning new ways to think doesn't excite me very much."},
        {id: "nfc13", text: "I prefer my life to be filled with puzzles that I must solve."},
        {id: "nfc14", text: "The notion of thinking abstractly is appealing to me. "},
        {id: "nfc15", text: "I would prefer a task that is intellectual, difficult, an important to one that is somewhat important but does not require much thought. "},
        {id: "nfc16", text: "I feel relief rather than satisfaction after completing a task that required a lot of mental effort. "},
        {id: "nfc17", text: "It's enough for me that something gets the job done, I don't care how or why it works."},
        {id: "nfc18", text: "I usually end up deliberating about issues even when don't affect me personally. "}
        
      ]
    }
  ]
}

export const Heartland_Forgiveness_Scale: TestData = {
  title: "Heartland Forgiveness Scale",
  subscales: [
    {
      id: "forgiveness of self",
      label:"Forgiveness of Self",
      items: [
       {id: "fos1", text: "Although I feel badly at first when I mess up, over time I can give myself some slack."},
        {id: "fos2", text: "I hold grudges against myself for negative things I've done."},
        {id: "fos3", text: "I learn from my mistakes and then I move on. "},
        {id: "fos4", text: "It is really hard for me to accept myself once I've messed up."},
        {id: "fos5", text: "With time, I am understanding of myself for mistakes I've made. "},
        {id: "fos6", text: "I don't stop criticizing myself for negative things I've felt, thought, said, or done."},
      ]
    },

    {
      id: "forgiveness of others",
      label: "Forgiveness of Others",
      items: [
        {id: "foo1", text: "I continue to punish a person who has done something that I think is wrong. "},
        {id: "foo2", text: "With time, I am understanding of others who have hurt me. "},
        {id: "foo3", text: "If others mess up, I hold it against them for a long time.  "},
        {id: "foo4", text: "It’s really hard for me to forgive a person who has done me wrong. "},
        {id: "foo5", text: "I eventually make peace with people who have hurt me. "},
        {id: "foo6", text: "I eventually stop blaming people who treated me badly. "},
      ]
    },

    {
      id: "forgiveness of situations",
      label: "Forgiveness of Situations",
      items : [
        {id: "fosi1", text: "When things go wrong for reasons that can't be helped, I get stuck in my anger."},
        {id: "fosi2", text: "With time, I can be understanding of bad circumstances in my life."},
        {id: "fosi3", text: "If I am disappointed by uncontrollable circumstances in my life, I continue to think negatively about them."},
        {id: "fosi4", text: "I eventually make peace with bad situations in my life."},
        {id: "fosi5", text: "It's really hard for me to accept negative situations in my life."},
        {id: "fosi6", text: "Eventually I let go of negative thoughts about bad circumstances that are beyond anyone's control."},
      ]
    }
  ]
}

export const Self_Compassion_Scale: TestData = {
  title: "Self Compassion Scale",
  subscales: [
    {
      id: "self - kindness",
      label: "Self-KindnessS",
      items: [
        {id: "sk1", text: "I'm kind to myself when I'm experiencing suffering."},
        {id: "sk2", text: "When I'm going through a very hard time, I give myself the caring and tenderness I need."},
        {id: "sk3", text: "I'm tolerant of my own flaws and inadequacies. "},
        {id: "sk4", text: "I try to be understanding and patient towards those aspects of my personality I don't like. "},
        {id: "sk5", text: "I try to consume myself with feelings of care and concern when I'm having a hard time."},
    
      ]
    }
    ,
    {
      id: "self-judgement",
      label: "Self-Judgement",
      items: [
        {id: "sj1", text: "I'm disapproving and judgemental about my own flows and inadequacies. "},
        {id: "sj2", text: "When times, are actually difficult, I tend to be tough on myself."},
        {id: "sj3", text: "I'm tolerant and impatient towards those aspects of my person. "},
        {id: "sj4", text: "When I see aspects of myself that I don't like, I get quite down on myself. "},
        {id: "sj5", text: "I can be a bit cold-hearted towards myself when I'm experiencing suffering. "},
      ]
    },
    {
      id:"common humanity",
      label: "Common Humanity",
      items: [
        {id: "ch1", text: "When things go wrong in my life, I see the difficulties as part of life that everyone goes thought."},
        {id: "ch2", text: "When I feel inadequate in some way, I try to remind myself that feelings of inadequacy are shared by most people. "},
        {id: "ch3", text: "When I'm feeling down, I try to remind myself that there are lots of other people in world feeling like I am."},
        {id: "ch4", text: "I try to see my failings as part of the human condition. "}
      ]
    },

    {
      id: "isolation",
      label: "Isolation",
      items: [
        {id: "iso1", text: "When I'm feeling down, I tend to feel like most other people are probably happier than I am."},
        {id: "iso2", text: "When I'm failing at something that's important to me, I tend to feel alone in my failure.  "},
        {id: "iso3", text: "When I feel inadequate in some way, I tend to feel as if most other people probably happier than I am. "},
        {id: "iso4", text: "When I'm feeling down I tent to obsess and fixate on everything that's wrong. "}
      ]
    },

    {
      id: "mindfulness",
      label: "Mindfulness",
      items: [
        {id: "min1", text: "When something upsets me I try to keep my emotions in balance. "},
        {id: "min2", text: "When I'm feeling down I try to approach my feelings with curiosity and openess.  "},
        {id: "min3", text: "When something painful happens I try to take a balanced view of the situation. "},
        {id: "min4", text: "When I'm feeling down I try to keep my emotions in balance.  "}
      ]
    },

    {
      id: "over-identification",
      label: "Over-Identification",
      items: [
        {id: "oi1", text: "When I'm feeling down I tend to obsess and fixate on everything that’s wrong. "},
        {id: "oi2", text: "When I fail at something important to me I become consumed by feelings of inadequacy.  "},
        {id: "oi3", text: "When something painful happens I tend to blow the incident out of proportion. "},
        {id: "oi4", text: "When I'm feeling down I tend to obsess and fixate on everything that’s wrong. "}
      ]
    }
  ]
}


export const The_Compassion_Scale: TestData={
  title: "The Compassion Scale",
  subscales: [
    {
      id: "kindness",
      label: "Kindness",
      items: [
        {id: "ki1", text: "If I see someone going through a difficult time, I try to be caring toward that person. "},
        {id: "ki2", text: "I like to be there for others when they are struggling. "},
        {id: "ki3", text: "I try to help others when they are going through a hard time. "},
        {id: "ki4", text: "When others feel sadness, I try to comfort them."}
      ]
    },

    {
      id: "common humanity",
      label: "Common Humanity",
      items: [
        {id: "ch1", text: "I tell myself that everyone goes through hard times. "},
        {id: "ch2", text: "I like to be there for others when they are struggling. "},
        {id: "ch3", text: "I try to help others when they are going through a hard time. "},
        {id: "ch4", text: "When others feel sadness, I try to comfort them."}
      ]
    },

    {
      id: "mindfulness",
      label:"Mindfulness",
      items: [
        {id: "mi1", text: "I pay attention when others are going through a hard time.  "},
        {id: "mi2", text: "I notice when others are suffering."},
        {id: "mi3", text: "I am aware when others are going through a difficult time."},
        {id: "mi4", text: "I listen patiently when others tell me about their problems."}
      ]
    },

    {
      id: "indifference",
      label: "Indiference",
      items: [
        {id: "ind1", text: "I am not really interested in other people's problems.  "},
        {id: "ind2", text: "I don't care that much when other people are having a hard time."},
        {id: "ind3", text: "I don't feel much when I see others suffering. "},
        {id: "ind4", text: "I am not usually moved by other people's struggles. "}
      ]
    }
  ]
}

export const Brief_Cope:TestData = {
  title: "Brief COPE",
  subscales: [
    {
      id: "self-distraction",
      label: "Self-Distraction",
      items: [
        {id: "sd1", text: "I've been turning to work or other activities to take my mind off things. "},
        {id: "sd2", text: "I've been doing something to think about it less, such as going to movies, watching TV, reading, daydreaming, sleeping, or shopping."}
      ]
      },

      {
        id: "active coping",
        label: "Active Coping",
        items: [
           {id: "ac1", text: "I've been concentrating my efforts on doing something about the situation I'm in.  "},
           {id: "ac2", text: "I've been taking action to try to make the situation better."}
        ]
      },
      {
        id:"denial",
        label:"Denial",
        items: [
          {id: "de1", text: "I've been saying to myself `this isn't real`. "},
          {id: "de2", text: "I've been refusing to believe that it has happened. "}
        ]
      },
      {
        id: "substance use",
        label: "Substance Use",
        items: [
          {id: "su1", text: "I've been using alcohol or other drugs to help me get through it. "},
          {id: "su2", text: "I've been making fun of the situation. "}
        ]
      },
      {
        id: "emotional support",
        label: "Emotional Support",
        items: [
          {id: "su1", text: "I've been using alcohol or other drugs to help me get through it. "},
          {id: "su2", text: "I've been making fun of the situation. "}
        ]
      },

      {
        id: "instrumental support",
        label: "Instrumental Support",
        items: [
          {id: "is1", text: "I've been getting help and advice from other people."},
          {id: "is2", text: "I've been trying to get advice or help from other people about what to do."}
        ]
      },
      {
        id: "behavioral disengagement",
        label: "Behavioral Disengagement",
        items: [
          {id: "bd1", text: "I've giving up trying to deal with it. "},
          {id: "bd2", text: "I've been giving up the attempt to cope. "}
        ]
      },
      {
        id: "venting",
        label: "Venting",
        items: [
          {id: "ve1", text: "I've been saying things to let my unpleasant feelings escape. "},
          {id: "ve2", text: "I've been expressing my negative feelings. "}
        ]
      },
      {
        id: "positive reframing",
        label: "Positive Reframing",
        items: [
          {id: "pr1", text: "I've been trying to see it in a different light, to make it seem more positive."},
          {id: "pr2", text: "I've been looking for something good in what is happening. "}
        ]
      },
      {
        id: "planning",
        label: "Planning",
        items: [
          {id: "pl1", text: "I've been trying to come up with a strategy about what to do.  "},
          {id: "pl2", text: "I've been thinking hard about what steps to take.  "}
        ]
      },
      {
        id: "humour",
        label: "Humour",
        items: [
          {id: "hu1", text: "I've been making fun of the situation. "},
          {id: "hu2", text: "I've been making jokes about it.  "}
        ]
      },
      {
        id: "acceptance",
        label: "Acceptance",
        items: [
          {id: "ac1", text: "I've been accepting the reality of the fact that it has happened.  "},
          {id: "ac2", text: "I've been learning to live with it.  "}
        ]
      },

      {
        id: "religion",
        label: "Religion",
        items: [
          {id: "re1", text: "I've been trying to find comfort in my religion or spiritual beliefs. "},
          {id: "re2", text: "I've been praying or meditating.  "}
        ]
      },

      {
        id: "self-blame",
        label: "Self-Blame",
        items: [
          {id: "sb1", text: "I've been criticizing myself.   "},
          {id: "sb2", text: "I've been blaming myself for things that happened.   "}
        ]
      }

    ]
    }



export const Hikikomori_Questionnaire_25: TestData = {
  title: "Hikikomori Questionnaire 25",
  subscales:[
    {
      id:"social isolation",
      label:"Social Isolation",
      items:[
        {id: "si1", text: "I stay at home most of the day."},
        {id: "si2", text: "I do not leave my house. "},
        {id: "si3", text: "I lack interest in going outside. "},
        {id: "si4", text: "I feel that I do not have a place where I belong in society. "},
        {id: "si5", text: "I feel that I am not being helpful to anyone. "},
        {id: "si6", text: "I feel like there is a wall between me and the rest of the world. "},
        {id: "si7", text: "I feel that I am not a person of value. "},
        {id: "si8", text: "I feel that nobody cares about me.  "},
        {id: "si9", text: "I feel that it is not worth talking to anyone. "},
        {id: "si10", text: "I do not have anyone with whom I can discuss important matters. "}
      ]

    },

    {
      id:"emotional coldness",
      label:"Emotional Coldness",
      items:[
        {id: "ec1", text: "I find it difficult to talk to people. "},
        {id: "ec2", text: "I feel that people look down on me. "},
        {id: "ec3", text: "I feel nervous when I see people I know.  "},
        {id: "ec4", text: "I feel uncomfortable when I see people I know.  "},
        {id: "ec5", text: "I am worried about what others think of me.  "},
        {id: "ec6", text: "I worry about how others will look at me. "},
        {id: "ec7", text: "I find it difficult to be with other people."},
        {id: "ec8", text: "I avoid social situations."},
        
      ]
    },

    {
       id:"social anxiety",
      label:"Social Anxiety",
      items:[
        {id: "sa1", text: "I avoid talking to people as much as possible. "},
        {id: "sa2", text: "I am not interested in being with other people. "},
        {id: "sa3", text: "I do not have any friends. "},
        {id: "sa4", text: "I do not have any close friends. "},
        {id: "sa5", text: "I feel lonely. "},
        {id: "sa6", text: "I feel that I am all alone. "},
        {id: "sa7", text: "I find it difficult to maintain friendships. "},
        
      ]
    }
  ]
}


export const Need_To_Belong: TestData = {
  title: "Need to Belong Scale",
  subscales: [
    {
      id:"need to belong",
      label:"Need to Belong",
      items:[
        {id: "nb1", text: "If other people do not seem to accept me, I do not let it bother me. "},
        {id: "nb2", text: "I try to avoid doing things that might cause others to learn negative things about me."},
        {id: "nb3", text: "I seldom worry about whether other people care about me. "},
        {id: "nb4", text: "I need to feel that there are people I can turn to in times of need."},
        {id: "nb5", text: "I want other people to accept me. "},
        {id: "nb6", text: "I do not like being alone."},
        {id: "nb7", text: "Being apart from my friends for long periods of time does not bother me. "},
        {id: "nb8", text: "I have a strong need to belong."},
        {id: "nb9", text: "My feelings are easily hurt when I feel that others do not accept me. "},
        {id: "nb10", text: "I rarely worry about my social popularity."},
        
      ]
    }
  ]
}

export const FAMILY_SATISFACTION: TestData = {
  title: "Family Satisfaction",
  subscales: [
    {
      id:"family satisfaction",
      label:"Family Satisfaction",
      items:[
        {id: "fs1", text: "The degree of closeness between family members."},
        {id: "fs2", text: "Your family’s ability to cope with stress."},
        {id: "fs3", text: "Your family’s ability to be flexible."},
        {id: "fs4", text: "Your family’s ability to share positive experiences."},
        {id: "fs5", text: "The quality of communication between family members."},
        {id: "fs6", text: "Your family’s ability to resolve conflicts."},
        {id: "fs7", text: "The amount of time you spend together as a family."},
        {id: "fs8", text: "The way problems are discussed."},
        {id: "fs9", text: "The fairness of criticism in your family. "},
        {id: "fs10", text: "Family members concern for each other."}
      ]
    }
  ]
}


export const CERQ_SF: TestData = {
  title: "CERQ Short Form",
  subscales: [
    {
      id: "self-blame",
      label:"Self-Blame",
      items: [
        {id: "sb1", text: "I feel that I am the one who is responsible for what has happened."},
        {id: "sb2", text: "I think that basically the cause must lie within myself."}
      ]
    },
    {
      id: "acceptance",
      label:"Acceptance",
      items: [
        {id:"aa1", text: "I think that I have to accept that this has happened."},
        {id:"aa2", text: "I think that I have to accept the situation."}
      ]
    },
    {
      id: "focus on thought",
      label:"Focus on thought",
      items:[
        {id: "ft1", text: "I often think about how I feel about what I have experienced."},
        {id: "ft2", text: "I am preoccupied with what I think and feel about what I have experienced."}
      ]
    },
    {
      id: "positive refocusing",
      label:"Positive Refocusing",
      items:[
        {id: "pr1", text: "I think of pleasant things that I have nothing to do with it."},
        {id: "pr2", text: "I think of something nice instead of what has happened."}
      ]
    },
    {
      id: "refocus on planning",
      label: "Refocus on planning",
      items:
      [
      {id: "rp1", text: "I think about how to change the situation."},
      {id: "rp2", text: "I think about a plan of what I can do best."}
      ]
    },
    {
      id: "positive reappraisal",
      label: "Positive Reappraisal",
      items:
      [
        {id: "pre1", text: "I think I can learn something from the situation."},
        {id: "pre2", text: "I think that I can become a stronger person as a result of what has happened."}
      ]
    },
    {
      id: "putting into perspective",
      label:"Putting into Perspective",
      items:
      [
        {id: "pip1", text: "I think that it hasn`t been too bad compared the other things."},
        {id: "pip2", text: "I tell myself that there are worse things in life."}
      ]
    },
    {
      id: "catastrophizing",
      label: "Catastrophizing",
      items: [
        {id: "cat1", text: "I keep thinking about how terrible it is what I have experienced."},
        {id: "cat2", text: "I continually think how terrible the situation has been."}
      ]
    },
    {
      id: "other-blame",
      label: "Other-Blame",
      items: [
        {id: "ob1", text: "I feel that others are responsible for what has happened."},
        {id: "ob2", text: "I feel that basically the cause lies with others. "}
      ]
    }
  ]
}

export const Psych_Ache: TestData={
  title: "Psychache",
  subscales: [
  {
    id: "psyache",
    label: "Psyache",
    items: [
      {id : "psya1", text: "I feel psychological pain."},
      {id: "psya2", text: "I am free from any emotional pain"},
      {id: "psya3", text: "I feel personal suffering."},
      {id: "psya4", text: "I feel a deep sense of hurt."},
      {id: "psya5", text: "I seem to ache inside."},
      {id: "psya6", text: "My soul feels as if it is aching."},
      {id: "psya7", text: "My psychological pain is worse than any physicalpain I`ve had."},
      {id: "psya8", text: "I feel `eaten up` from inside."},
      {id: "psya9", text: "My psychological pain is so bad I`d do almost anything to make it stop."},
      {id: "psya10", text: "I can`t take any more psychological pain."},
      {id: "psya11", text: "My emotional pain is unyielding."},
      {id: "psya12", text: "My pain is more than I can bear."},
      {id: "psya13", text: "I am in more psychological pain than I can stand."}

    ]
  }
  ]
}


export const DASS_21: TestData ={
  title: "DASS 21",
  subscales:[
    {
      id: "depression",
      label: "Depression",
      items:[
      {id: "dep1", text: "I couldn`t seem to experience any positive feeling at all."},
      {id: "dep2", text: "I found it difficult to work up the initiative to do things."},
      {id: "dep3", text: "I felt that I had nothing to look forward to."},
      {id: "dep4", text: "I felt down-hearted and blue."},
      {id: "dep5", text: "I was unable to become enthusiastic about anything."},
      {id: "dep6", text: "I felt I wasn`t worth much as a person."},
      {id: "dep7", text: "I felt that life was meaningless."},
      ]
    },
    {
     id: "stress",
     label: "Stress",
     items: [
      {id: "stre1", text: "I found it hard to wind down."},
      {id: "stre2", text: "I tended to over-react to situations."},
      {id: "stre3", text: "I felt that I was using a lot of nervous energy."},
      {id: "stre4", text: "I found myself getting agitated."},
      {id: "stre5", text: "I found it difficult to relax."},
      {id: "stre6", text: "I was intolerant of anything that kept me from getting on with what I was doing."},
      {id: "stre7", text: "I felt that I was rather touchy."}
     ]
    },

    {
      id:"anxiety",
      label: "Anxiety",
      items: [
        {id: "anx1", text: "I was aware of dryness of my mouth."},
        {id: "anx2", text: "I experienced breathing difficulty (e.g: excessively rapid breahting, breathelessness in the absence of physical exertion)."},
        {id: "anx3", text: "I experienced trembling (e.g: in the hands)."},
        {id: "anx4", text: "I was worried about situations in which I might panic and make a fool of myself."},
        {id: "anx5", text: "I felt I was close to panic."},
        {id: "anx6", text: "I was aware of the action of my heart in the absence of physical exertion (e.g: sense of heart rate increase, heart skipping a beat)."},
        {id: "anx7", text: "I felt scared without any good reason."}
      ]
    }
  ]
}

export const Maladaptative_Daydreaming_16: TestData = {
  title: "Maladaptative Daydreaming Scale 16",
  subscales: [
    {
      id: "maladaptative daydreaming",
      label: "Maladaptative Daydreaming",
      items: [
        {id: "mds1", text: "How much of your time spent daydreaming is occupied by vivid and counselor-like characters or elaborate fantasy worlds?"},
        {id: "mds2", text: "How much do you feel that need to continue a daydream when you are interrupted?"},
        {id: "mds3", text: "How much of a problem is it for you to keep your daydreaming under control?"},
        {id: "mds4", text: "How much does your daydreaming interfere with your academic/professional succes?"},
        {id: "mds5", text: "To what extent do you feel that your daydreaming interferes with your household or other daily chores?"},
        {id: "mds6", text: "How much do you feel that you daydreaming interferes with your social life or relationships?"},
        {id: "mds7", text: "How much do you value your daydreams more than your real life experiences?"},
        {id: "mds8", text: "To what extent do you prefer to daydream rather than spent time with real people?"},
        {id: "mds9", text: "How much do you feel that your daydreaming is becoming a problem to you?"},
        {id: "mds10", text: "To what extent do you find yourself making repetitive moments (e.g: pacing, rocking, hand movements) while daydreaming?"},
        {id: "mds11", text: "How much does your daydreaming cause your personal distress?"},
        {id: "mds12", text: "How often do you find yourself talking out loud or making facial expressions while daydreaming?"},
        {id: "mds13", text: "How much do you find your daydreaming to be more interesting than your actual life?"},
        {id: "mds14", text: "How much do you find it difficult to stop daydreaming once you have started?"},
        {id: "mds15", text: "How much does your daydreaming prevent you from doing things you really want to do?"},
        {id: "mds16", text: "How much do you find yourself `lost` in your daydreams for long periods of time?"},
      ]
    }
  ]
}


export const Ryff_Psychological_Wellbeing: TestData = {
  title: "Ryff Psychological Wellbeing",
  subscales:[
    {
      id: "autonomy",
      label: "Autonomy",
      items: [
        {id: "aut1", text: "I tend to be influenced by people with strong opinions."},
        {id: "aut2", text: "I have confidence in my own opinions, even if they are different from the way most other people think."},
        {id: "aut3", text: "I judge myself by what I think is important, not by the values of what others think is important."}
      ]
    },
    {
      id: "environmental mastery",
      label: "Environmental Mastery",
      items: [
        {id: "emn1", text: "The demands of everyday life often get me down."},
        {id: "emn2", text: "In general, I feel I am in charge of the situation in which I live."},
        {id: "emn3", text: "I am good at managing the responsibilities of daily life."}
      ]
    },

    {
      id: "personal growth",
      label: "Personal Growth",
      items: [
        {id: "pgr1", text: "For me, life has been a continuous process of learning, changing and growth."},
        {id: "pgr2", text: "I think it is important to have new experiences that challenge how I think about myself and the world."},
        {id: "pgr3", text: "I gave up trying to make big improvements or changes in my life a long time ago."}
      ]
    },

    {
      id: "positive relations with others",
      label: "Positive Relations with Others",
      items: [
        {id: "pro1", text: "In many ways I feel disappointed about my achievements in life."},
        {id: "pro2", text: "People would describe me as a giving person, willing to share my time with others."},
        {id: "pro4", text: "I have experienced many warm and trusting relationships with others."}
      ]
    },
    {
      id: "purpose in life",
      label: "Purpose in Life",
      items: [
        {id: "pil1", text: "Some people wander aimlessly through life, but I am not one of them."},
        {id: "pil2", text: "I live life one day at the time and don`t really think about future."},
        {id: "pil3", text: "I sometimes feel as if I`ve done all there is to do in life."}
      ]
    },
    {
      id: "self-acceptance",
      label:"Self-Acceptance",
      items: [
        {id: "sac1", text: "I like most parts of my personality."},
        {id: "sac2", text: "When I look at the story of my life, I am pleased with how things have turned out so far."},
        {id: "sac3", text: "In many ways I feel disappointed about my achievements in life."}
      ]
    }
  ] 
}

export const State_Self_Esteem: TestData ={
  title: "State Self-Esteem (SSES)",
  subscales: [
    {
      id: "performance",
      label: "Performance",
      items: [
        {id: "per1", text: "I feel confident about my abilities."},
        {id: "per2", text: "I feel frustrated or rattled about my performance."},
        {id: "per3", text: "I feel that I am troubled understanding things that I read."},
        {id: "per4", text: "I feel as smart as others."},
        {id: "per5", text: "I feel displeased with myself."},
        {id: "per6", text: "I feel confident that I am understanding things."},
        {id: "per7", text: "I feel that I have less scholastic ability right now than others."},
        {id: "per8", text: "I feel like I`m not doing well."}
      ]
    },
    {
      id: "social",
      label: "Social",
      items: [
        {id: "soc1", text: "I am worried about whether I am regarded as a success or failure." },
        {id: "soc2", text: "I feel that others respect and admire me."},
        {id: "soc3", text: "I feel self-conscious."},
        {id: "soc4", text: "I am worried about what other people think of me."},
        {id: "soc5", text: "I feel inferior to others at this moment."},
        {id: "soc6", text: "I feel concerned about the impression I am making."},
        {id: "soc7", text: "I am worried about looking foolish."}
      ]
    },

    {
      id: "appearance",
      label: "Appearance",
      items: [
        {id: "app1", text: "I feel satisfied with my weight."},
        {id: "app2", text: "I am dissatisfied with my weight."},
        {id: "app3", text: "I am pleased with my appearance right now."},
        {id: "app4", text: "I feel unattractive."}
      ]
    }
  ]
}


export const Multidimensional_State_Boredom_Scale: TestData ={
  title: "Multidimensional State Boredom Scale",
  subscales: [
    {
      id: "disengagement",
      label: "Disengagement",
      items: [
        {id: "dis1", text: "I am stuck in a situation that I feel is irrelevant."},
        {id: "dis2", text: "I am lonely."},
        {id: "dis3", text: "I want to do something fun, but there is nothing to do."},
        {id: "dis4", text: "I feel like I am sitting around waiting for something to happen."},
        {id: "dis5", text: "I feel empty."},
        {id: "dis6", text: "I feel like I am just `going through the motions`."},
        {id: "dis7", text: "I wish I were doing something exciting."}
      ]
    },
    {
      id: "inattention",
      label:"Inattention",
      items:[
        {id: "ina1", text: "I am easily distracted."},
        {id: "ina2", text: "I am distracted by my own thoughts."},
        {id: "ina3", text: "It`s difficult to focus my attention."},
        {id: "ina4", text: "My mind is wandering."}
      ]
    },
    {
      id: "high arousal",
      label: "High Arousal",
      items: [
        {id: "hia1", text: "I feel restless."},
        {id: "hia2", text: "I feel like my heart is racing."},
        {id: "hia3", text: "I am agitated."},
        {id: "hia4", text: "Everything seems to be irritating me right now."}
      ]
    },
    {
      id: "time perception",
      label: "Time Perception",
      items: [
        {id: "tip1", text: "Time is passing very slowly."},
        {id: "tip2", text: "I am constantly checking the clock."},
        {id: "tip3", text: "I feel like time is dragging."},
        {id: "tip4", text: "I feel as though I am waiting for time to pass."}
      ]
    },
    {
      id: "low arousal",
      label: "Low Arousal",
      items: [
        {id: "loa1", text: "I feel lethargic."},
        {id: "loa2", text: "I feel tired. "},
        {id: "loa3", text: "I feel like I have no energy."},
        {id: "loa4", text: "I feel down."}
      ]
    },
    {
      id: "general",
      label: "General",
      items: [
        {id: "gen1", text: "I am bored."}
      ]
    }
  ]
}

export const SHAPS: TestData= {
  title: "Snaith-Hamilton Pleasure Scale",
  subscales: [
    {
      id: "anhedonia",
      label:"Anhedonia",
      items: [
        {id: "anh1", text:"I would enjoy favorite pastimes."},
        {id: "anh2", text:"I would enjoy being with my family or close friends."},
        {id: "anh3", text:"I would find pleasure in my hobbies."},
        {id: "anh4", text:"I would be able to enjoy my favorite meal."},
        {id: "anh5", text:"I would enjoy a warm bath or refreshing shower."},
        {id: "anh6", text:"I would find pleasure in the scent of flowers or the smell of a fresh sea breeze or freshly baked bread."},
        {id: "anh7", text:"I would enjoy seeing other people`s smiling faces."},
        {id: "anh8", text:"I would enjoy a cup of tea or coffee or my favorite drink."},
        {id: "anh9", text:"I would enjoy reading a book, magazine or newspaper."},
        {id: "anh10", text:"I would enjoy a cup of tea or coffee or favorite drink."},
        {id: "anh11", text:"I would find pleasure in small things, e.g. bright sunny day, a telephone call from a friend."},
        {id: "anh12", text:"I would enjoy seeing my family`s or close friends happiness."},
        {id: "anh13", text:"I would enjoy a beautiful landscape or view."},
        {id: "anh14", text:"I would enjoy helping others."}
      ]
    }
  ]
}


export const Basic_Psychological_Needs: TestData={
  title:"Basic Psychological Need Satisfaction and Frustration Scale",
  subscales: [
    {
      id: "autonomy",
      label: "Autonomy",
      items: [
        {id: "aut1", text: "I feel a sense of choice and freedom in the things I undertake."},
        {id: "aut2", text: "I feel that my decisions reflect what I really want."},
        {id: "aut3", text: "I feel my choices express who I really am."},
        {id: "aut4", text: "I feel I have been doing what I really interests me."},
        {id: "aut5", text: "Most of the things I do feel like `have to`s`."},
        {id: "aut6", text: "I feel forced to do many things I wouldn`t choose to do."},
        {id: "aut7", text: "I feel pressured to do too many things."},
        {id: "aut8", text: "My daily activities feel like a chain of obligations."}
      ]
    },
    {
      id: "competence",
      label: "Competence",
      items: [
        {id:"com1", text:"I feel confident that I can do things well."},
        {id:"com2", text:"I feel capable at what I do."},
        {id:"com3", text:"I feel competent to achieve my goals."},
        {id:"com4", text:"I feel I can successfully complete difficult tasks."},
        {id:"com5", text:"I have serious doubts about whether I can do things well."},
        {id:"com6", text:"I feel disappointed with many of my performance."},
        {id:"com7", text:"I feel insecure about my abilities."},
        {id:"com8", text:"I feel like a failure because of the mistakes I made."}
      ]
    },
    {
      id:"relatedness",
      label:"Relatedness",
      items:[
        {id:"rel1", text:"I feel that the people I care about also care about me."},
        {id:"rel2", text:"I feel connected with people who care for me, and for whom I care."},
        {id:"rel3", text:"I feel close and connected with other people who are important to me."},
        {id:"rel4", text:"I experience a warm feeling with the people I spend time with."},
        {id:"rel5", text:"I feel excluded from the group I want to belong to."},
        {id:"rel6", text:"I feel that people who are important to me are cold and distant towards me."},
        {id:"rel7", text:"I have the impression that people I spend time with dislike me."},
        {id:"rel8", text:"I feel the relationships I have are just superficial."}
      ]
    }
  ]
}

export const Insomnia_Severity_Index: TestData={
  title: "Insomnia Severity Index",
  subscales: [
    {
      id: "insomnia",
      label: "Insomnia",
      items: [
        {id:"ins1", text:"Difficult falling asleep."},
        {id:"ins2", text:"Difficult staying asleep."},
        {id:"ins3", text:"Problems waking up too early."},
        {id:"ins4", text:"How satisfied or dissatisfied are you with your current sleep pattern?"},
        {id:"ins5", text:"How noticeable to others do you think your sleep problem is in terms of impairing the quality of life?"},
        {id:"ins6", text:"How worried/distressed are you about your current sleep pattern?"},
        {id:"ins7", text:"To what extent do you consider your sleep problem to interfere with your daily function (e.g. daytime fatiguq, mood, ability to function at work/daily chores, concentration, memory, mood, etc) currently?"}

      ]
    }
  ]
    
}

export const Leisure_Motivation_Scale: TestData={
  title:"Leisure Motivation Scale",
  subscales: [
    {
      id:"intellectual",
      label:"Intellectual",
      items:[
        {id:"inte1", text:"I learn about myself."},
        {id:"inte2", text:"I learn about things around me."},
        {id:"inte3", text:"I satisfy my curiosity."},
        {id:"inte4", text:"I explore new ideas."},
        {id:"inte5", text:"I expand my interests."},

      ]
    },
    {
      id:"social",
      label:"Social",
      items:[
        {id:"soci1", text:"I am with others."},
        {id:"soci2", text:"I build friendships."},
        {id:"soci3", text:"I interact with others."},
        {id:"soci4", text:"I developed close relationships."},
        {id:"soci5", text:"I meet new and different people."}
      ]
    },
    {
      id:"social-avoidance",
      label:"Social-Avoidance",
      items:[
        {id:"soav1", text:"I can relax."},
        {id:"soav2", text:"I can relieve stress."},
        {id:"soav3", text:"I can escape from my daily routine."},
        {id:"soav4", text:"I can be calm and peaceful."},
        {id:"soav5", text:"I can unburden myself."}
      ]
    }
  ]
}

export const BSMAS: TestData ={
  title: "Bergen Social Media Addiction Scale",
  subscales:[
    {
      id:"salience",
      label:"Salience",
      items: [
        {id:"sali1", text: "You spend a lot of time thinking about social media or planning use of it."},
      ]
    },
    {
      id:"tolerance",
      label:"Tolerance",
      items:[
        {id:"tole1", text:"You feel an urge to use social media more and more."}
      ]
    },
    {
      id:"mood modification",
      label:"Mood Modification",
      items:[
        {id:"moo1", text:"You use social media in order to forget about personal problems."},
      ]
    },
    {
      id:"relapse",
      label:"Relapse",
      items:[
        {id:"rela1", text:"You have tried to cut down on the use of social media without success."}
      ]
    },
    {
      id:"withdrawal",
      label:"Withdrawal",
      items:[
        {id:"with1", text:"You become restless or troubled if you are prohibited from using social media."}
      ]
    },
    {
      id:"conflict",
      label:"Conflict",
      items:[
        {id:"conf1", text:"You use social media so much that it has had a negative impact on your job/studies."}
      ]
    }
  ]
}


export const SAS_SV: TestData={
  title: "Smartphone Addiction Scale-Short Version",
  subscales:[
    {
      id:"smartphone addiction",
      label:"Smartphone Addiction",
      items:[
        {id:"smar1", text:"Missing planned work due to smartphone use."},
        {id:"smar2", text:"Having a hard time concentrating in class, while doing assignments, or while working due to smartphone use."},
        {id:"smar3", text:"Feeling lightheaded or having blurred vision when using the smartphone for a long time."},
        {id:"smar4", text:"Feeling pain in the wrists or at the back of the neck while using a smartphone."},
        {id:"smar5", text:"Feeling impatient and fretful when I am not holding smartphone."},
        {id:"smar6", text:"Having my smartphone on my mind even when I am not using it."},
        {id:"smar7", text:"I will never give up using my smartphone even when my daily life is already greatly affected by it."},
        {id:"smar8", text:"Constantly checking my smartphone so as not to miss conversations between other people or Twitter or Facebook."},
        {id:"smar9", text:"Using my smartphone longer than I had intended."},
        {id:"smar10", text:"The people around me tell me that I use my smartphone too much."}
      ]
    }
  ]
}

export const GAS: TestData ={
  title: "Game Addiction Scale - Short Form",
  subscales: [
    {
      id:"gaming addiction",
      label:"Gaming Addiction",
      items:[
        {id:"gas1", text:"Did you think about playing a game all day long?"},
        {id:"gas2", text:"Did you spend increasing amounts of time on games?"},
        {id:"gas3", text:"Did you play games to forget about real life?"},
        {id:"gas4", text:"Were you unable to reduce your time spend on games?"},
        {id:"gas5", text:"Did you feel bad when you where unable to play?"},
        {id:"gas6", text:"Did you have fights with others (e.g. family, friends) over your time spent on games?"},
        {id:"gas7", text:"Did you neglect other important activities (e.g. school work, sports) to play games?"}
      ]
    }
  ]
}

export const BWANIME: TestData ={
  title: "Binge-Watching Anime Addiction Questionnaire",
  subscales: [
    {
      id:"craving and loss of control",
      label:"Craving and Loss of Control",
      items:[
        {id:"clc1", text:"How many times have you been watching anime series more than you would have?"},
        {id:"clc2", text:"Do you happen to neglect household chores to spend more time watching anime series?"},
        {id:"clc3", text:"Do you often read reviews and opinions about new anime series"},
        {id:"clc4", text:"How many times do you find yourself diverting your attention from negative thoughts with the consoling thought of your favorite anime series?"},
        {id:"clc5", text:"Do you happen to foretaste the moment you will watch an anime series again?"},
        {id:"clc6", text:"Do you happen to find yourself saying `one more episode and I`ll turn it off` when you watch an anime series"},
        {id:"clc7", text:"Are you interested in new releases anime series?"},
        {id:"clc8", text:"Does thinking about the moments when you watch your favorite anime series help you manage your stressful moments?"}
      ]
    },
    {
      id:"social problems and neglect of duties",
      label:"Social Problems and Neglect of Duties",
      items:[
        {id:"spnd1", text:"Do people you hand out with complain about the amount of time you spend watching anime series?"},
        {id:"spnd2", text:"Do you happen to react abruptly, raise your voice, or rudely reply if someone disturbs you while you are watching an anime series?"},
        {id:"spnd3", text:"Do you sleep less to stay up late to watch an anime series?"},
        {id:"spnd4", text:"Do you try to minimize or hide how much time you spend watching an anime series?"},
        {id:"spnd5", text:"Do you happen to choose to spend more time watching an anime series rather than hanging out with others?"}
      ]
    },
    {
      id:"physical problems and health consequences",
      label:"Physical problems and Health Consequences",
      items:[
        {id:"pphc1", text:"Do you happen to concentrate on your thoughts on anime series and fantasize about the evolution of the plot?"},
        {id:"pphc2", text:"Do you often feel depressed,irritable or nervous when you can`t watch an anime series?"},
        {id:"pphc3", text:"Do you happen to think that people overestimate the time you spend watching anime series?"}
      ]
    },
    {
      id:"coping and mood modification",
      label:"Coping and Mood Moficiation",
      items:[
        {id:"cmm1", text:"Do you happen to check out the new anime series releases before doing anything else important?"},
        {id:"cmm2", text:"Do you try to minimize when someone points out time you spend watching anime series?"},
        {id:"cmm3", text:"Do you happen to think that your life without the anime series would be boring, empty and joyless"},
        {id:"cmm4", text:"Do you happen to feel good when you are able to watch an anime series again?"}
      ]
    }
  ]
}


export const Relationship_Scales_Questionnaire: TestData ={
  title: "Relationships Scales Questionnaire",
  subscales:[
    {
  id:"avoidant",
  label:"Avoidant",
  items:[
    {id:"avo1", text:"I find it difficult to depend on other people."},
    {id:"avo2", text:"It is very important to me to feel independent."},
    {id:"avo3", text:"I find it easy to get emotionally close to others."},
    {id:"avo4", text:"I want to merge completely with another person."},
    {id:"avo5", text:"I am not sure that I can always depend on other to be there when I need them."},
    {id:"avo6", text:"I want to be completely emotionally intimate with others."},
    {id:"avo7", text:"I am comfortable depending on other people."},
    {id:"avo8", text:"I find it difficult to trust others completely."},
    {id:"avo9", text:"I want emotionally close relationships."},
    {id:"avo10", text:"I am comfortable having other people depend on me."},
    {id:"avo11", text:"People are never there when you need them."},
    {id:"avo12", text:"It is very important to me to feel self-sufficient."},
    {id:"avo13", text:"I am nervous when anyone gets too close to me."},
    {id:"avo14", text:"I prefer not to have other people depend on me."},
    {id:"avo15", text:"I am somewhat uncomfortable being close to others."},
    {id:"avo16", text:"I know that other will be there when I need them."},
    {id:"avo17", text:"Romantic partners often want me to be closer than I feel comfortable being."},
    {id:"avo18", text:"I find it relatively easy to get close to others"}
  ]
  },
  {
    id:"anxious",
    label:"Anxious",
    items:[
      {id:"secu1", text:"I want to merge completely with another person."},
      {id:"secu2", text:"I worry that I will be hurt is allow myself to become too close to others."},
      {id:"secu3", text:"I am comfortable without close emotional relationships."},
      {id:"secu4", text:"I often worry that romantic partners don`t really love me."},
      {id:"secu5", text:"I find it difficult to trust others completely."},
      {id:"secu6", text:"I worry about others getting too close to me."},
      {id:"secu7", text:"I worry that others don`t value me as much as I value them."},
      {id:"secu8", text:"People are never there when you need them."},
      {id:"secu9", text:"My desire to merge completely sometimes scares people away."},
      {id:"secu10", text:"I am nervous when anyone gets too close to me."},
      {id:"secu11", text:"I often worry that ronabtic partners won`t want to stay with me."},
      {id:"secu12", text:"I worry about being abandoned."},
      {id:"secu13", text:"I find that others are reluctant to get as close as I would like."},
      {id:"secu14", text:"I prefer not to depend on others."},
      {id:"secu15", text:"I worry about having others not accept me."}
    ]
  }
]
}


export const Benevolent_Childhood_Experiences: TestData = {
  title: "Benevolent Childhood Experiences",
  subscales: [
    {
      id: "benevolent childhood experiences",
      label: "Benevolent Childhood Experiences",
      items: [
        { id: "bce1",  text: "Did you have at least one caregiver with whom you felt safe?" },
        { id: "bce2",  text: "Did you have at least one good friend?" },
        { id: "bce3",  text: "Did you have beliefs that gave you comfort?" },
        { id: "bce4",  text: "Did you like school?" },
        { id: "bce5",  text: "Did you have at least one teacher who cared about you?" },
        { id: "bce6",  text: "Did you have good neighbors?" },
        { id: "bce7",  text: "Was there an adult (not a parent/caregiver) who could provide you with support or advice?" }, // ⚠️ duplicate cu bce10 — verifică textul corect
        { id: "bce8",  text: "Did you have opportunities to have a good time?" },
        { id: "bce9",  text: "Did you like yourself or feel comfortable with yourself?" },
        { id: "bce10", text: "Did you have a predictable home routine, like regular meals and a regular bedtime?" }, // ⚠️ duplicate cu bce7
        { id: "bce11", text: "Did you feel accepted for who you were? ?" },
        { id: "bce12", text: "Was there at least one adult who cared about your progress and achievements in school?" },
        { id: "bce13", text: "Were you usually able to get a good night’s sleep?" },
        { id: "bce14", text: "Did you have access to food that was healthy and nutritious?" },
        { id: "bce15", text: "Did you have access to adequate medical care when you needed it?" },
        { id: "bce16", text: "Did you feel that you were treated fairly (e.g. in your family and community)?" },
        { id: "bce17", text: "Did you have adequate law enforcement in your community that made you feel safe?" },
        { id: "bce18", text: "Did you have at least one person to teach you to say 'No' to negative influences?" },
        { id: "bce19", text: "Did you regularly spend time outside in the sunshine or around nature?" },
        { id: "bce20", text: "Did you have something that you felt you were good at or that made you proud?" },
      ],
    },
  ],
};

export const FINANCIAL_STRAIN_INDEX:TestData={
  title: "Financial Strain Index",
  subscales: [
    {
      id:"material adequacy",
      label:"Material Adequacy",
      items:[
        {id:"maa1", text:"I have enough money to afford the kind of food we should eat."},
        {id:"maa2", text:"I have enough money to afford the kind of clothing we should have."},
        {id:"maa3", text:"I have enough money to afford the kind of medical care that we should have."},
        {id:"maa4", text:"I have enough money to afford the kind of housing we should have."},
        {id:"maa5", text:"I have money left over at the end of the month."}
      ]
    },
    {
      id:"psychological financial stress",
      label:"Psychological Financial Stress",
      items:[
        {id:"pfs1", text:"I worry about my monthly financial obligations."},
        {id:"pfs2", text:"I have difficulty paying my bills each month."},
        {id:"pfs3", text:"I feel that my financial situation is beyond my control."}
      ]
    }
  ]
}

export const The_Escapism_Scale:TestData ={
  title:"The Escapism Scale",
  subscales:[
    {
      id:"self-expansion",
      label:"Self-Expansion",
      items:[
        {id:"sele1", text:"I open up for positive experiences."},
        {id:"sele2", text:"I get to experience new things about myself."},
        {id:"sele3", text:"I learn more about myself."},
        {id:"sele4", text:"I get to learn new things."},
        {id:"sele5", text:"My life is enriched."},
        {id:"sele6", text:"I feel that I am developing myself."}
      ]
    },
    {
      id:"self-suppression",
      label:"Self-Suppression",
      items:[
        {id:"sesu1", text:"I try to suppress my problems."},
        {id:"sesu2", text:"I try to get way from myself."},
        {id:"sesu3", text:"I try to suppress my negative thoughts."},
        {id:"sesu4", text:"I try to shut out everything that is difficult."},
        {id:"sesu5", text:"I try to forgot the things that are unpleasant in my life."}
      ]
    }
  ]
}


export const Anime_Story_World_Engagement_Scale:TestData={
  title:"Anime Story World Engagement Scale",
  subscales:[
    {
      id:"suspense/curiosity propensity",
      label:"Suspense/Curiosity Propensity",
      items:[
        {id:"aswe1", text:"I am often impatient to find our how an anime story ends."},
        {id:"aswe2", text:"I am often glued to an anime, yearning to see how everything plays out."},
        {id:"aswe3", text:"Anime series arouse my curiosity easily."}
      ]
    },
    {
      id:"emotional engageability",
      label:"Emotional Engageability",
      items:[
        {id:"aswe4", text:"It is easy for me to get involved with the feelings of the charactersin an anime."},
        {id:"aswe5", text:"I am often affected emotionally by anime series."},
        {id:"aswe6", text:"I often feel happy when a character succeeds and I feel sad when they suffer in some way."},
      ]
    },
    {
      id:"ease of accepting unrealism",
      label:"Ease of Accepting Unrealism",
      items:[
        {id:"aswe7", text:"I often become very involved in an anime that I would otherwise consider unrealistic just for the fun of it."},
        {id:"aswe8", text:"I am easily immerse even in unrealistic anime stories."},
        {id:"aswe9", text:"I often feel myself accepting anime story events that I might have otherwise considered unrealistic."}
      ]
    },
    {
      id:"presence propensity",
      label:"Presence Propensity",
      items:[
        {id:"aswe10", text:"While watching an anime series, the story world is often closer to me than the real world."},
        {id:"aswe11", text:"I often feel that an anime series creates a new world, and then that world suddenly disappears when the anime series ends."},
        {id:"aswe12", text:"When I watch an anime series, I often feel that my body is in the room, but my mind is inside the world created by the anime story."}
      ]
    }
  ]
}


export const NISE:TestData={
  title:"Narrative Identity Self-Evaluation",
  subscales:[
    {
      id:"meaning making/self-exploration",
      label:"Meaning Making/Self-Exploration",
      items:[
        {id:"nise1", text:"Thinking about anime story and characters help me know who I am as a person."},
        {id:"nise2", text:"I am curious to understand how anime story and characters have changed me as a person."},
        {id:"nise3", text:"I think a lot about connections between anime  story and characters experiences and my life experiences I have had (e.g.  How one anime experiences caused a better understanding of a later life experience"},
        {id:"nise4", text:"I have learned lessons and gained insights from thinking about anime story and characters. "},
        {id:"nise5", text:"As time passes, I notice that I increasingly learn and grow from anime story and characters. "},
      ]
    },
    {
      id:"narrative coherence/structural order",
      label:"Narrative Coherence/Structural Order",
      items:[
        {id:"nise6", text:"I want to get the facts right when I think about what anime story and characters and their impact for my life. "},
        {id:"nise7", text:"In anime story and characters , I think it's important to know where and when things have happened. "},
        {id:"nise8", text:"Anime story and characters usually have a clear beginning, middle and end."},
        {id:"nise9", text:"It matters to me to have a coherent anime story and relatable characters. "},
        {id:"nise10", text:"I want to get the timeline of anime story and characters correct as much as possible."},
      ]
    },
    {
      id:"emotional valuation/belongingness",
      label:"Emotional Valuation/Belongingness",
      items:[
        {id:"nise11", text:"Looking back on my life story, I recognize a sense of belongingness with anime story and characters.  "},
        {id:"nise12", text:"Most bad things that happened in anime story and with characters have eventually resolved in a positive way."},
        {id:"nise13", text:"Overall I would consider my life story to be more positive than negative when I am thinking on anime story and characters."},
        {id:"nise14", text:"The anime story and characters made me to think that the story of my life is a highly  optimistic one. "},
        {id:"nise15", text:"In my life story, anime story and characters have largely been the driving force, rather than external world. "},
      ]
    },
    {
       id:"narrative fragmentation",
      label:"Narrative Fragmentation",
      items:[
        {id:"nise16", text:"When I am immersing in anime story and characters, I end up feeling confused about who I am as a person. "},
        {id:"nise17", text:"When I immerse into anime story and characters, I believed that I have had no control over what has happened in the story of my life. "},
 
      ]

    },
    {
      id:"agency and redemption pattern",
      label:"Agency and Redemption Pattern",
      items:[
        {id:"nise18", text:"In anime story and characters, I envisioned myself as a protagonist able to love and to be loved by others. "},
        {id:"nise19", text:"In anime story and characters plot, I notice a pattern of how bad events, even the most grievous ones eventually turned good in the end."},
        {id:"nise20", text:"When I immerse myself in anime story, my life story doesn't feels like a puzzle and everything is falling into place as it should."},
        
      ]
    }
  ]
}


export const RAD:TestData={
  title:"Recognizing Addictive Disorders",
  subscales:[
    {
      id:"alcohol addiction",
      label:"Alcohol Addiction",
      items:[
        {id:"rad1", text:"Drinking is like a slippery slope, I end up drinking more than I wanted to."},
        {id:"rad2", text:"My drinking has caused a disagreement or two."},
        {id:"rad3", text:"Because I was drinking, I wasn't able to get as many things done at home, work or school. "},
        {id:"rad4", text:"I probably think about drinking more than most people do. "},
        {id:"rad5", text:"It's hard to cut down, even though I know drinking isn`t good for my health. "}
      ]
    },
    {
      id:"smoking addiction",
      label:"Smoking Addiction",
      items:[
        {id:"rad6", text:"At certain times of the day, I find myself really wanting a cigarette. "},
        {id:"rad7", text:"Sometimes my cravings for cigarettes are powerful."},
        {id:"rad8", text:"When I get stressed, I can smoke a lot more than I planned."},
        {id:"rad9", text:"Sometimes I feel driven to smoke."},
        {id:"rad10", text:"I still smoke even though people tell me it's bad for my health."}
      ]
    },
    {
      id:"gambling addiction",
      label:"Gambling Addiction",
      items:[
        {id:"rad11", text:"Times gets away from me when I am gambling. "},
        {id:"rad12", text:"If I lose a lot of money, I can feel down for several days."},
        {id:"rad13", text:"I get distracted by thoughts of gambling."},
        {id:"rad14", text:"I may skip  on certain things so I can go gamble."},
        {id:"rad15", text:"Gambling has caused problems for me."}
      ]
    },
    {
     id:"binge eating",
      label:"Binge Eating",
      items:[
        {id:"rad16", text:"Sometimes my cravings for certain foods are overpowering."},
        {id:"rad17", text:"Being unable to control my eating can cause some stress in my relationships."},
        {id:"rad18", text:"I think I am less happy because of my binge eating."},
        {id:"rad18", text:"I can feel so upset from binge eating that I don't get to things that I said I would."},
        {id:"rad20", text:"I tend to lose control when I eat, despite my good intentions. "}
      ]
    },
    {
      id:"porn addiction",
      label:"Porn Addiction",
      items:[
        {id:"rad21", text:"I can feel a strong desire to engage in sexual activity."},
        {id:"rad22", text:"When it comes to sex/porn, I almost always want more."},
        {id:"rad23", text:"I find myself thinking about how good it would feel to look at pornography or engage in other sexual behaviors."},
        {id:"rad24", text:"Porn and sex can make me feel better, but it can me feel worse."},
        {id:"rad25", text:"I am very preoccupied by my sexual thoughts and/or desire."}
      ]
    }

  ]
}
  
export const RSES: TestData ={
  title:"Rosenberg`s Self-Esteem Scale",
  subscales:[
    {
      id:"self-esteem",
      label:"Self-Esteem",
      items:[
        {id:"rses1", text:"On the whole, I am satisfied with myself."},
        {id:"rses2", text:"At the times I think I am no good at all."},
        {id:"rses3", text:"I feel that I have a number of good qualities."},
        {id:"rses4", text:"I am able to do things as well as most other people."},
        {id:"rses5", text:"I feel I do not have much to be proud of."},
        {id:"rses6", text:"I certainly feel useless at times."},
        {id:"rses7", text:"I feel that I`m a person of worth, at least on an equal plane with others."},
        {id:"rses8", text:"I wish I could have more respect for myself."},
        {id:"rses9", text:"All in all, I am inclined to feel that I am a failure."},
        {id:"rses10", text:"I take a positive atitude toward myself."}
      ]
    }
  ]
}



export const SWLS: TestData ={
  title:"Satisfaction with Life Scale",
  subscales:[
    {
      id:"life satistaction",
      label:"Life Satisfaction",
      items:[
        {id:"swls1", text:"In most ways my life is close to my ideal."},
        {id:"swls2", text:"The conditions of my life are excellent."},
        {id:"swls3", text:"I am satisfied with my life."},
        {id:"swls4", text:"So far I have gotten the important things I want in life."},
        {id:"swls5", text:"If I could live my life over, I would change almost nothing."},
        
      ]
    }
  ]
}


export const ERQ: TestData ={
  title:"Emotional Regulation Questionnaire",
  subscales:[{
    id:"cognitive reappraisal",
    label:"Cognitive Reappraisal",
    items:[
      {id:"cr1", text:"When I want to feel more positive emotion (such as joy or amusement), I change what I’m thinking about."},
      {id:"cr3", text:"When I want to feel less negative emotion (such as sadness or anger), I changewhat I’m thinking about. "},
      {id:"cr5", text:"When I’m faced with a stressful situation, I make myself think about it in a way that helps me stay calm. "},
      {id:"cr7", text:"When I want to feel more positive emotion, I change the way I’m thinking aboutthe situation. "},
      {id:"cr8", text:"I control my emotions by changing the way I think about the situation I’m in. "},
      {id:"cr10", text:"When I want to feel less negative emotion, I change the way I’m thinking about the situation. "},
    ]
  },
  {
    id:"expressive suppression",
    label:"Expressive Suppression",
    items:[
      {id:"es2", text:"I keep my emotions to myself."},
      {id:"es4", text:"When I am feeling positive emotions, I am careful not to express them."},
      {id:"es6", text:"I control my emotions by not expressing them."},
      {id:"es9", text:"When I am feeling negative emotions, I make sure not to express them. "},
    ]
  }
 ]
}// Aici poți adăuga alte teste în viitor:
// export const PERSONALITY_TEST_2: TestData = { ... }

export const CQO: TestData ={
  title:"Compassion Questionnaire to Others",
  subscales:[{
    id:"thinking/feeling compassionately",
    label:"Thinking/Feeling Compassionately",
    items:[
      {id:"tfc9", text:"When someone fails, I think they are stupid."},
      {id:"tfc10", text:"When someone makes a mistake, I feel mad at them."},
      {id:"tfc11", text:"I feel angry at others when they struggle."},
      {id:"tfc12", text:"I feel annoyed at others when they don't understand things quickly. "},
      {id:"tfc14", text:"When someone has a hard time, I think it is their mistake."},
      {id:"tfc15", text:"I feel irritated by the shortcomings of others."},
      {id:"tfc16", text:"I am very critical of other people’s flaws and inadequacies."},
      {id:"tfc17", text:"I judge others harshly when they make a mistake. "},
      {id:"tfc18", text:"When someone fails, I think they deserve it. "},
    ]
  },
  {
    id:"connection with others",
    label:"Connection with Others",
    items:[
      {id:"cwo2", text:"My suffering helps me connect with other people’s suffering."},
      {id:"cwo6", text:"My difficulties make it easier to understand other people's difficulties."},
      {id:"cwo7", text:"My struggles allow me to understand the struggles of others."},
      {id:"cwo8", text:"I notice the commonalities between my suffering and the suffering of others. "},
    ]
  },
  {
    id:"acting or intention to act compassionately",
    label:"Acting or Intention to Act Compassionately",
    items:[
      {id:"iac1", text:"When someone is feeling bad, I do whatever I can to make them feel better."},
      {id:"iac3", text:"When someone is feeling bad, I try to soothe them."},
      {id:"iac4", text:"I try to comfort others when they are suffering."},
      {id:"iac5", text:"I take care of others when they are in need. "},
      {id:"iac13", text:"I help others when they have a tough time. "}
    ]
  }


]
}