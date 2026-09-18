'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const animeData = [
  {
    id: 'naruto',
    title: 'NARUTO SHIPPUDEN ',
    plot: 'Set in a fictional world, the series follows Naruto Uzumaki, a young ninja who seeks recognition from his peers and dreams of becoming the Hokage, the leader of his village. The story delves deeply into themes of trauma, isolation, resilience, social bonds, and the psychological burden of generational conflict, making it a cornerstone for exploring narrative identification and psychological resilience. Furthermore, it examines identity reconstruction through group belonging and the long-term emotional consequences of rejection, which provides an exceptionally rich narrative framework for analyzing media psychology dynamics, coping mechanisms, and character attachment patterns among modern audiences across diverse cultural backgrounds.',
    logoImage: '/images/Logo/Naruto_Shippuden.png',
    characterName:"",
    characterImage: '/images/Characters_Logo/Naruto_Logo.png',
    testLink: '/tests/naruto',
  },
  {
    id: 'attack-on-titan',
    title: 'ATTACK ON TITAN',
    plot: 'Humanity lives inside cities surrounded by enormous walls due to the Titans, gigantic humanoid creatures who devour humans seemingly without reason. The story follows Eren Yeager and his companions as they uncover the dark, complex truths behind their world, dealing with themes of freedom, existential dread, moral ambiguity, and the psychological descent into radicalization.',
    logoImage: '/images/Logo/Attack_On_Titan.png',
    characterName: '',
    characterImage: '/images/Characters_Logo/Attack_On_Titan_Logo.png',
    testLink: '/tests/attack-on-titan',
  },
  {
    id: 'hunter-x-hunter',
    title: 'HUNTER X HUNTER',
    plot: 'Gon Freecss discovers that his father, whom he was told was dead, is actually a world-renowned Hunter—a licensed professional who specializes in fantastic pursuits. Gon resolves to follow in his footsteps by taking the rigorous Hunter Examination, leading to a profound exploration of human motivation, dark personality traits (Dark Tetrad), morality, and complex interpersonal dynamics.',
    logoImage: '/images/Logo/Hunter_X_Hunter.png',
    characterName: 'Gon Freecss',
    characterImage: '/images/Characters_Logo/Hunter_X_Hunter_Gon.png',
    testLink: '/tests/hunter-x-hunter',
  },
  {
    id: 'vinland-saga',
    title: 'VINLAND SAGA',
    plot: 'Set in Viking-age Europe, the narrative follows Thorfinn, a young warrior whose quest for revenge against his father\'s killer drives him into a brutal life of mercenary warfare. Over time, the story transforms into a masterclass on trauma recovery, pacifism, existential transformation, and the psychological heavy cost of violence and redemption.',
    logoImage: '/images/Logo/Vinland_Saga.png',
    characterName: 'Thorfinn Karlsefni',
    characterImage: '/images/Characters_Logo/Vinland_Saga_Logo.png',
    testLink: '/tests/vinland-saga',
  },
  {
    id: 'monster',
    title: 'MONSTER',
    plot: 'Dr. Kenzo Tenma, a brilliant Japanese brain surgeon working in Germany, makes a fateful decision to save the life of a young boy named Johan Liebert instead of the mayor\'s. Years later, Johan turns out to be a psychopathic serial killer, forcing Tenma on a harrowing philosophical and psychological pursuit across Europe to correct his moral dilemma.',
    logoImage: '/images/Logo/Monster.png',
    characterName: 'Johan Liebert',
    characterImage: '/images/Characters_Logo/Monster_Logo.png',
    testLink: '/tests/monster',
  },
  {
    id:"black-clover",
    title: "BLACK CLOVER",
    plot:"Black Clover is an action-fantasy anime set in a world where magic rules supreme. The story follows two orphans, Asta and Yuno, who are abandoned at the same church on the exact same day. While Yuno grows up as a magical prodigy blessed with immense wind powers and a rare four-leaf clover grimoire, Asta is shockingly born with zero mana and is entirely unable to use magic. Despite this massive disadvantage, both make a fierce childhood promise to compete for the title of Wizard King, the highest-ranking mage in the Clover Kingdom.When they turn fifteen, their journeys officially begin. Asta's relentless physical training pays off when he awakens a mysterious five-leaf clover grimoire containing a devil named Liebe, granting him unique Anti-Magic swords that can cut through and nullify any spell. Yuno joins the elite Golden Dawn squad, while Asta is taken in by the Black Bulls—a rowdy, chaotic band of misfits led by the unconventional captain Yami Sukehiro.What starts as a classic shonen rivalry evolves into an epic, high-stakes battle for survival. Asta and his comrades must protect their kingdom from devastating threats, including an ancient race of reincarnated elves manipulated by Underworld devils, and later, the tyrannical Dark Triad of the Spade Kingdom who plan to open the gates of hell.Throughout it all, Black Clover delivers high-octane battles, deep character growth, and a celebration of found family. At its core, the series thrives on Asta's signature mantra: his magic is never giving up, proving that sheer grit and hard work can overcome even the most insurmountable odds.",
    logoImage:"/images/Logo/Black_Clover.png",
    characterImage:"/images/Characters_Logo/Black_Clover_Logo.png",
    testLink:"/tests/black-clover",

  },
  {
    id:"bleach",
    title:"BLEACH",
    plot:"Bleach follows Ichigo Kurosaki, a regular teenager who has the unusual ability to see ghosts. His life changes forever when he encounters Rukia Kuchiki, a Soul Reaper—a spiritual warrior tasked with guiding souls to the afterlife and protecting the living from evil monsters known as Hollows. When a powerful Hollow attacks his family, Rukia is gravely injured and attempts to lend Ichigo a portion of her powers. To her shock, Ichigo accidentally absorbs all of her spiritual energy, instantly transforming into a Soul Reaper and effortlessly defeating the beast.Because Rukia is temporarily stranded without her powers, Ichigo is forced to act as a substitute Soul Reaper in her hometown of Karakura. He forms an unlikely team of allies, including his classmates Orihime Inoue, Uryu Ishida (a Quincy archer whose clan has a historic rivalry with Soul Reapers), and Yasutora Sado. Their lives turn upside down when Soul Society sends executioners to arrest Rukia for the illegal act of sharing her powers with a human.Determined to save her, Ichigo and his friends undergo brutal training and infiltrate the Soul Society, a hidden spiritual realm. This rescue mission kicks off an expansive narrative that blends intense sword battles with deep lore. Ichigo unlocks his own unique Soul Reaper powers, discovers his latent Hollow and Quincy heritage, and masters his signature weapon, the Zanpakuto, ultimately achieving Bankai.As the series progresses, the scope expands far beyond a rescue mission. Ichigo and the Gotei 13 (the Soul Reaper military) must face escalating existential threats, including Sosuke Aizen, a traitorous captain seeking to overthrow the ruling heavens, and later, the Wandenreich—an empire of long-hidden Quincies led by Yhwach, who seeks to merge the living world, Soul Society, and Hueco Mundo into a single realm.Renowned for its stylish character designs, iconic bankai releases, and thrilling swordplay, Bleach is a cornerstone shonen series that explores themes of duty, identity, protection, and the heavy sacrifices required to shield those you love.",
    logoImage:"/images/Logo/Bleach.png",
    characterImage:"/images/Characters_Logo/Bleach_Logo_2.png",
    testLink:"/tests/bleach",
  },
  {
   id:"blue-exorcist",
   title:"BLUE EXORCIST",
   plot:"Blue Exorcist follows Rin Okumura, a hot-headed teenager who, along with his twin brother Yukio, was raised by the renowned priest and exorcist Shiro Fujimoto. Rin's life shatters when he discovers a terrifying truth: he is the biological son of Satan, the ruler of the demonic realm of Gehenna.When Satan attacks to drag Rin back to the underworld, Shiro sacrifices his life to protect him. Devastated and fueled by a desire for revenge, Rin draws the demon-slaying sword Kurikara, which breaks his seal and awakens his inherited powers—the destructive, signature blue flames of Satan.Determined to make his own path and kill his biological father, Rin enrolls at the prestigious True Cross Academy. There, he enters a secret training program to become an exorcist, only to discover that his supposedly ordinary brother Yukio is already a veteran exorcist and—unexpectedly—one of his teachers. Alongside a close-knit group of fellow students who become his loyal friends, Rin learns to harness his demonic heritage rather than let it consume him, balancing high-stakes supernatural combat with the struggles of identity, belonging, and confronting dark conspiracies within the Vatican's order.",
   logoImage:"/images/Logo/Blue_Exorcists.png",
   characterImage:"/images/Characters_Logo/Blue_Exorcist_Logo.png",
   testLink:"/tests/blue-exorcists"
  },
  {
    id:"chainsaw-man",
    title:"CHAINSAW MAN",
    plot:"Chainsaw Man follows Denji, an impoverished and deeply indebted teenager living on the absolute fringes of society. Burdened by his deceased father's massive debt to the Yakuza, Denji survives by selling his organs and hunting down devils alongside his loyal canine-like companion, Pochita, who is the Chainsaw Devil. When the Yakuza betray and murder Denji, Pochita merges with his lifeless body's heart, resurrecting him as a human-devil hybrid with the terrifying ability to transform parts of his body into chainsaws.After brutally slaughtering his killers, Denji is discovered by Makima, a high-ranking leader of the Public Safety Devil Hunters. Seeing his unique potential and his obedience when offered basic comforts like food and a warm bed, she recruits him into her division. Thrown into a cynical, hyper-violent world where devils are born from human fears, Denji joins a squad of eccentric and traumatized misfits, including the arrogant Fiend Power and the vengeance-driven Aki Hayakawa.Unlike traditional shonen heroes driven by grand ideals or justice, Denji’s motivations are startlingly simple and base—he wants to eat good food, sleep comfortably, and touch a woman. However, the narrative quickly strips away any comedic innocence as it descends into a psychological nightmare. Denji is forced to confront brutal losses, systemic manipulation, and a web of cosmic horror orchestrated by Makima, whose true, chilling nature unravels as the story progresses.Renowned for its unpredictable plotting, dark humor, and cinematic pacing, Chainsaw Man subverts standard shonen tropes. It offers a gritty, emotionally raw exploration of trauma, survival, and what it truly means to crave human connection in a world designed to chew you up and spit you out.",
    logoImage:"/images/Logo/Chainsaw_Man.png",
    characterImage:"/images/Characters_Logo/Chainsaw_Man_Logo.png",
    testLink:"/tests/chainsaw-man"
  },
  {
    id:"code-geass",
    title:"CODE GEASS",
    plot: "Code Geass follows Lelouch vi Britannia, a brilliant exiled Britannian prince living under an alias in an occupied Japan, which has been conquered and renamed Area 11 by the superpower Holy Empire of Britannia. Driven by a burning hatred for his father, the Emperor, and a vow to create a gentle world for his blind sister Nunnally, Lelouch seizes an unexpected chance when he crosses paths with a mysterious immortal girl named C.C.Granting him a supernatural power known as Geass, enables Lelouch to issue a command that any person must unconditionally obey. Donning a theatrical mask and taking on the alias Zero, Lelouch establishes a resistance movement called the Black Knights. He uses his supreme tactical genius, psychological warfare, and his new power to wage a calculated guerrilla war against the military might of the Britannian Empire.As the rebellion escalates, the conflict transforms into a massive geopolitical chess match filled with high-stakes mecha warfare , shifting loyalties, and devastating moral compromises. Lelouch is forced to fight against his own childhood best friend, Suzaku Kururugi, who serves as a Britannian soldier aiming to reform the empire from within.Renowned for its masterclass in political intrigue, psychological suspense, and one of the most iconic, polarizing endings in anime history, Code Geass explores the heavy burden of leadership, the corruption of power, and the eternal philosophical debate of whether the ends justify the means.",
    logoImage:"/images/Logo/Code_Geass.png",
    characterImage:"/images/Characters_Logo/Code_Geass_Logo.png",
    testLink:"/tests/code-geass"
  },
  {
    id:"death-note",
    title:"DEATH NOTE",
    plot:"Death Note follows Light Yagami, a brilliant high school prodigy who grows utterly bored with a corrupt and stagnant world. His life changes forever when he stumbles upon the Death Note—a supernatural notebook dropped by a bored Shinigami (death god) named Ryuk. According to the rules written inside, any human whose name is written in the notebook will die.Initially skeptical, Light tests the book and realizes its horrifying power is entirely real. Driven by a twisted sense of justice, he resolves to purge the world of criminals and become the self-appointed god of a new, crime-free utopia, operating under the alias Kira. As thousands of criminals mysteriously drop dead, global panic ensues, drawing the attention of Interpol and L, an eccentric, world-renowned super-detective.What follows is a high-stakes, cerebral cat-and-mouse psychological thriller. Light and L engage in a brilliant, intellectual duel of wits, each constantly trying to deduce the other's identity and location while hiding behind layers of deception. Light must use his position as a high school student—and even infiltrate L's investigative task force—to stay a step ahead, all while dodging the surveillance of L and his allies.Renowned for its tense mind games, moral ambiguity, and relentless pacing, Death Note explores the corrupting nature of absolute power, the slippery slope of vigilantism, and the timeless philosophical question of whether the ends can ever justify the means.",
    logoImage:"/images/Logo/Death_Note.png",
    characterImage:"/images/Characters_Logo/Death_Note_Logo.png",
    testLink:"/tests/death-note"
  },
  {
    id:"demon-slayer",
    title:"DEMON SLAYER",
    plot:"Kimetsu no Yaiba (Demon Slayer) follows Tanjiro Kamado, a kind-hearted boy who earns a modest living selling charcoal to support his family in the mountains. His peaceful life is shattered when he returns home one day to find his family brutally slaughtered by a demon. The sole survivor is his younger sister, Nezuko, who has been transformed into a demon herself. Although she retains flashes of human emotion and protects Tanjiro from a passing Demon Slayer named Giyu Tomioka, Nezuko must now suppress her bloodlust and navigate a world that wants her destroyed.Determined to avenge his family and find a cure to turn Nezuko back into a human, Tanjiro embarks on a grueling path to become a Demon Slayer. He undergoes intense physical and mental conditioning under the former Water Hashira, Sakonji Urokodaki, mastering the breathing techniques and sword styles required to combat supernatural foes. After passing the lethal Final Selection exam, Tanjiro officially joins the Demon Slayer Corps, carrying Nezuko in a specialized wooden box on his back wherever he goes.As Tanjiro ventures into the field, he is joined by an eccentric and unforgettable crew of fellow recruits: Zenitsu Agatsuma, a cowardly and anxious boy who unlocks monstrous lightning-fast strength only when unconscious, and Inosuke Hashibira, a feral, boar-headed brawler raised by wild animals. Together, they take on increasingly dangerous missions, confronting the Twelve Kizuki—the elite, terrifying inner circle of demons serving the primordial demon progenitor, Muzan Kibutsuji.Renowned for its breathtaking animation, fluid swordplay, and deeply emotional core, Demon Slayer explores the unbreakable bonds of family, empathy even for one's enemies, and the blazing light of human resilience against absolute darkness.",
    logoImage:"/images/Logo/Demon_Slayer.png",
    characterImage:"/images/Characters_Logo/Demon_Slayer_Logo.png",
    testLink:"/tests/demon-slayer"
  },
  {
    id:"dr-stone",
    title:"DR. STONE",
    plot:"Dr. Stone follows Senku Ishigami, a hyper-intelligent and fiercely analytical high school prodigy whose world is upended when a mysterious green flash petrifies every single human on Earth, turning them to stone. Millennia later, Senku miraculously breaks free from his stone prison into a reclaimed, primitive wilderness where human civilization has regressed to the Stone Age.Armed with nothing but his brilliant scientific mind and an unwavering belief in human progress, Senku sets out to rebuild civilization from scratch. He is soon revived alongside his athletic childhood friend Taiju Oki and his soft-hearted crush Yuzuriha. Together, they use fundamental chemistry, physics, and engineering to systematically recreate human inventions—starting from stone-age tools, pottery, and gunpowder, all the way to glass, electricity, antibiotics, and steam engines.However, Senku's quest is not without conflict. When they are forced to revive Tsukasa Shishio, a formidable martial artist  an ideological split shatters their plans. Tsukasa seeks to purge the adult world and create a ruthless utopia free from corrupt governance, while Senku believes science belongs to everyone and must restore all of humanity. This sparks a global-scale wars where Senku’s newly formed Kingdom of Science must outsmart and out-innovate Tsukasa's military empire using pure intellect and technological superiority.Renowned for its unique blend of genuinely accurate science education, fast-paced survival adventure, and eccentric cast of characters, Dr. Stone is an inspiring celebration of human curiosity, ingenuity, and the relentless march of civilization.",
    logoImage:"/images/Logo/Dr_Stone.png",
    characterImage:"/images/Characters_Logo/Dr_Stone_Logo.png",
    testLink:"/tests/dr-stone"
  },
  {
    id:"dragon-ball-super",
    title:"DRAGON BALL SUPER",
    plot:"Dragon Ball Super follows Goku after his earth-shattering defeat of Majin Buu, picking up during a brief period of peace on Earth. However, this tranquility is short-lived as the universe's ultimate power balance is tested. Goku’s incredible strength draws the attention of Beerus, the God of Destruction, who awakens from a long slumber searching for a mythical warrior known as the Super Saiyan God. After a thrilling battle that threatens the cosmos, Goku unlocks this divine transformation, earning Beerus's respect and expanding his horizons far beyond Earth.As the series unfolds, the scope scales up to a cosmic level. Goku and Vegeta undergo rigorous training under Whis, Beerus's angelic martial arts teacher, unlocking even higher tiers of divine power, most notably Super Saiyan Blue. This newfound strength is immediately put to the test against resurfaced threats from the past, such as a resurrected Frieza, as well as terrifying new foes from alternate realities, like the formidable assassin Hit and the ruthless Goku Black.The narrative reaches its climax with the Tournament of Power, an epic, high-stakes battle royale hosted by the Omni-King (Zeno). Eighty elite warriors from eight different universes clash in a massive arena, fighting for the ultimate survival of their home realities. Pushed to his absolute physical and mental limits, Goku breaks through his mortal shell to awaken Ultra Instinct—a god-tier state where the body reacts and moves independently of thought.Blending nostalgic martial arts action with multiversal lore, fast-paced combat, and beloved characters, Dragon Ball Super expands the legendary franchise into a grand cosmic epic about limits broken, fierce rivalries, and the unending drive to grow stronger.",
    logoImage:"/images/Logo/Dragon_Ball_Super.png",
    characterImage:"/images/Characters_Logo/DragonBall_Super_Logo.png",
    testLink:"/tests/dragon-ball-super"
  },
  {
    id:"fairy-tail",
    title:"FAIRY TAIL",
    plot:"Fairy Tail follows Lucy Heartfilia, a spirited young celestial wizard who dreams of joining the world-famous wizards' guild known as Fairy Tail. Her wish comes true when she crosses paths with Natsu Dragneel, a hot-headed, fire-breathing Dragon Slayer who is searching for his missing adoptive dragon father, Igneel. Natsu invites Lucy to Fairy Tail, a chaotic, rowdy, and fiercely loyal family of eccentric mages located in the kingdom of Fiore.Along with Natsu's floating blue feline companion, Happy, and their frequent teammates—the ice-make wizard Gray Fullbuster and the armored swordswoman Erza Scarlet—Lucy forms Team Natsu. Together, they take on dangerous guild jobs across the continent, battling rogue dark guilds, ancient demons, and corrupt magic councils.As the story unfolds, the lighthearted adventures evolve into massive, high-stakes magical wars. The guild uncovers deep conspiracies tied to Zeref, an immortal dark wizard, and Acnologia, the apocalyptic Dragon King. Throughout every trial, Fairy Tail's defining strength isn't just their individual magical powers, but their unbreakable bond of friendship, proving that love and solidarity can conquer even the darkest evils.",
    logoImage:"/images/Logo/Fairy_Tail.png",
    characterImage:"/images/Characters_Logo/Fairy_Tail.png",
    testLink:"/tests/fairy-tail"
  },
  {
    id:"food-wars",
    title:"FOOD WARS",
    plot:"Food Wars!: Shokugeki no Soma follows Soma Yukihira, a talented teenage chef who works alongside his father, Joichiro, at their family’s modest neighborhood diner. Soma has spent his entire life cooking alongside his dad and dreams of eventually surpassing him and taking over the restaurant. However, his life pivots overnight when his father abruptly closes the diner to take a catering job in New York, enrolling Soma instead into Totsuki Culinary Academy—an elite, ultra-prestigious culinary high school where less than ten percent of students manage to graduate.Totsuki is a brutal pressure cooker of a school governed by culinary combat. Students settle disputes, academic rivalries, and rank challenges through Shokugeki—official, high-stakes cooking duels judged by strict culinary experts. Armed with practical diner grit, unconventional flavor combinations, and a fierce competitive spirit, Soma quickly turns heads. He forms alliances and rivalries with a brilliant cast of peers, including Erina Nakiri (the school's elite , Megumi Tadokoro (a nervous country girl with incredible hospitality and regional cooking skills), and Takumi Aldini (an Italian-Japanese rival chef).As the series progresses, the academic challenges escalate from grueling boot camps and autumn elections to open warfare against the Central Gourmet Institute, a tyrannical regime led by Erina's oppressive father, Azami Nakiri. Azami attempts to strip away culinary creativity and freedom, reducing all cooking to rigid conformity. To save culinary expression and their friends, Soma and the rebellious students rise up in a massive, multi-stage team Shokugeki to overthrow the administration.Renowned for its mouth-watering descriptions of gourmet dishes, fast-paced kitchen action, and its trademark exaggerated, ecstatic reactions to incredible food, Food Wars! is a thrilling culinary journey celebrating passion, innovation, and the power of cooking to bring people together.",
    logoImage:"/images/Logo/Food_Wars.png",
    characterImage:"/images/Characters_Logo/Food_Wars_Logo.png",
    testLink:"/tests/food-wars"
  },
  {
    id:"frieren",
    title:"FRIEREN BEYOND JOURNEY END",
    plot:"Frieren: Beyond Journey's End follows Frieren, an elven mage who was part of the legendary hero party that successfully defeated the Demon King and brought peace to the realm after a ten-year quest. Because elves live for thousands of years, a decade-long journey is merely a blink of an eye to Frieren. However, the true emotional weight of time hits her decades later when her human companions—most notably the hero Himmel—grow old and pass away. Overwhelmed by grief and the realization that she never truly took the time to understand her mortal friends while they were alive, Frieren embarks on a new, quiet pilgrimage.Accompanied by Fern, a human orphan raised by her former party member Heiter, and later by Stark, a courageous young warrior, Frieren travels the very same path she once walked with Himmel. Along the way, she collects obscure spell-collecting magic, helps ordinary people, and slowly learns to appreciate the fleeting, precious nature of human life.Interspersed with reflective flashbacks of her past adventures and tense, tactical magical duels against lingering demons, Frieren: Beyond Journey's End is a breathtaking, melancholy masterpiece. It explores the passage of time, the beauty of memory, and how the smallest moments shared with loved ones leave an eternal impact.",
    logoImage:"/images/Logo/Frieren_Beyond_Journey_End.png",
    characterImage:"/images/Characters_Logo/Frieren_Logo_2.png",
    testLink:"/tests/frieren"
  },
  {
    id:"fullmetal-alchemist-brotherhood",
    title:"FULLMETAL ALCHEMIST BROTHERHOOD",
    plot:"Fullmetal Alchemist: Brotherhood follows Edward and Alphonse Elric, two brilliant brothers living in the militaristic nation of Amestris who break the ultimate taboo of alchemy: human transmutation. In a desperate, heartbreaking attempt to resurrect their deceased mother, the ritual goes catastrophically wrong. Edward loses his left leg and right arm, while Alphonse loses his entire physical body, his soul narrowly saved and bound to a massive suit of armor by Edward at the cost of his own right arm.To restore their bodies, the teenage brothers enlist as State Alchemists—with Edward earning the moniker Fullmetal Alchemist—and embark on a nationwide quest to find the legendary Philosopher's Stone. However, as they dive deeper into their research, they uncover a terrifying dark conspiracy at the highest levels of the military and government. They discover that Amestris itself was engineered as a massive containment circle for a sinister, shadowy entity known as Father,  who is plotting a catastrophic transmutational event to sacrifice the entire nation's population for godlike power.Joined by a loyal cast of allies—including the fierce flame alchemist Roy Mustang, the steadfast mechanic Winry Rockbell, and various comrades from across the military—the Elric brothers must wage a desperate, multi-front war against Father and his immortal homunculi.Renowned for its flawless pacing, tightly woven plotting, and profound philosophical themes, Fullmetal Alchemist: Brotherhood is widely celebrated as a masterpiece. It is a powerful exploration of sacrifice, the ethics of science, the heavy cost of hubris, and the unbreakable bond of brotherhood.",
    logoImage:"/images/Logo/Fullmetal_Alchemist.png",
    characterImage:"/images/Characters_Logo/Fullmetal_Alchemist_Logo.png",
    testLink:"/tests/fullmetal-alchemist-brotherhood"
  },
  {
    id:"haikyuu",
    title:"HAIKYUU",
    plot:"Haikyuu!! follows Shoyo Hinata, a high school boy with explosive athletic energy who falls deeply in love with volleyball after catching a glimpse of a national tournament featuring a star player nicknamed the Little Giant. Despite standing well below average height, Hinata is determined to defy expectations. He single-handedly revives his junior high school's volleyball club, culminating in an agonizing official match against a powerhouse school led by Tobio Kageyama—a brilliant, tyrannical setter known as the King of the Court.Fate takes a dramatic turn when Hinata and Kageyama end up attending the same institution: Karasuno High School. Once feared as the Fallen Champion,  Karasuno's volleyball team has lost its former glory. To succeed, the fierce rivals are forced to put aside their mutual animosity and combine Hinata's extraordinary vertical leap and lightning-fast reflexes with Kageyama's pinpoint setting precision. The result is a breathtaking, freak quick attack that takes the prefecture by storm.As the series progresses, Karasuno rebuilds its legacy, welcoming back seasoned veterans and developing a diverse, fiercely supportive roster of players, including the reliable captain Daichi Sawamura, the powerhouse ace Asahi Azumane, and the defensive guardian Yu Nishinoya. Together, they endure grueling training camps, face devastating heartbreaks, and engage in high-octane tournament matches against legendary rival schools like Nekoma High and Aoba Johsai.Renowned for its heart-pounding athletic matches, incredible character growth, and a profound celebration of teamwork and trust, Haikyuu!! transforms the game of volleyball into an epic, emotional journey about overcoming limits, learning to fly together, and finding strength in your teammates.",
    logoImage:"/images/Logo/Haikyuu.png",
    characterImage:"/images/Characters_Logo/Haikyuu_Logo.png",
    testLink:"/tests/haikyuu"
  },
  {
    id:"inuyasha",
    title:"INUYASHA",
    plot:"InuYasha follows Kagome Higurashi, a modern-day high school girl whose ordinary life is upended when she falls into an ancient well at her family’s Shinto shrine. She is magically transported to Japan’s Sengoku (Warring States) period, an era overrun by demons. Kagome soon discovers that she is the modern reincarnation of Kikyo, a powerful miko (priestess) who sealed away a half-demon named InuYasha fifty years prior.When a monstrous demon attacks Kagome to extract the Shikon Jewel—a mystical orb capable of granting any wish—trapped within her body, Kagome accidentally shatters the jewel into hundreds of fragments that scatter across feudal Japan. To prevent these corrupted shards from falling into the wrong hands and empowering malevolent creatures, Kagome and InuYasha are forced to form an uneasy alliance.As they travel across the war-torn countryside to collect the scattered shards, their mismatched duo expands into a beloved, dysfunctional band of travelers. They are joined by Shippo, a young fox demon; Miroku, a cursed, womanizing Buddhist monk; Sango, a fierce demon slayer armed with a giant boomerang; and Kirara, her loyal two-tailed demon cat. Together, the group must constantly evade and combat a myriad of malicious yokai.Their ultimate antagonist is Naraku, a ruthless, shapeshifting mastermind born from the amalgamation of countless malicious demons and a human bandit's obsession. Naraku manipulates the fragments, sows psychological torment, and plays with the heroes' deepest traumas, all while striving to corrupt the complete Shikon Jewel for his own absolute power.Blending folklore, romance, time-travel adventure, and pulse-pounding sword battles featuring InuYasha's demonic blade Tessaiga, InuYasha is a classic fantasy epic that explores themes of redemption, sacrifice, and enduring bonds forged across time.",
    logoImage:"/images/Logo/Inutasha.png",
    characterImage:"/images/Characters_Logo/Inuyasha_Logo.png",
    testLink:"/tests/inuyasha"
  },
  {
    id:"jojo-bizzare-adventure",
    title:"JOJO BIZZARE ADVENTURE",
    plot:"Stardust Crusaders follows Jotaro Kujo, a stoic and rebellious Japanese high schooler who suddenly manifests a mysterious supernatural entity he calls an evil spirit. To understand what is happening to him, his grandfather, Joseph Joestar, arrives from America and reveals the terrifying truth: these manifestations are Stands—psychic physical projections of a person's life energy. Worse still, the awakening of the Joestar family's Stands is triggered by the return of DIO, their immortal ancestral enemy who has resurrected after a century trapped at the bottom of the ocean, having stolen the body of Jonathan Joestar.When DIO's malevolent influence strikes Jotaro's mother with a fatal, slow-acting illness, Jotaro, Joseph, and an eclectic crew of Stand users embark on a high-stakes, 50-day race against time from Tokyo to Cairo, Egypt. Along the way, they are joined by the noble French swordsman Jean Pierre Polnareff, the stoic Egyptian scholar Muhammad Avdol, the reclusive expert Kakyoin, and Iggy, a coffee-loving dog with a sand-manipulating Stand.As they battle waves of deadly assassins sent by DIO, the team masters the tactical combat of Stands, where victory depends on outsmarting an enemy's unique ability rather than raw strength. The journey culminates in Cairo with one of the most legendary, high-octane final showdowns in anime history between Jotaro and DIO, whose Stand, The World, possesses the terrifying ability to stop time itself.Diamond is Unbreakable shifts the franchise's tone into a supernatural murder mystery set in 1999 within the seemingly quiet, picturesque Japanese town of Morioh. The story follows Josuke Higashikata—a pompadour-rocking high schooler who is secretly the illegitimate teenage son of an aging Joseph Joestar. Armed with his healing Stand, Crazy Diamond, Josuke is joined by Jotaro Kujo (who visits to investigate local anomalies), his eccentric friend Koichi Hirose, and the wealthy, self-proclaimed manga artist Rohan Kishibe.The peaceful facade of Morioh shatters when the group discovers that a mysterious magical bow and arrow is circulating through the town, awakening Stand abilities in ordinary citizens. While some new users become allies, others use their powers for malice.The investigation takes a chilling turn when the heroes uncover a dark, long-hidden secret: Morioh is home to a methodical, cunning serial killer named Yoshikage Kira. Kira desires nothing more than to live a quiet life, but he possesses a compulsive urge to murder women and keep their severed hands as his girlfriends. Supported by his lethal bomb-based Stand, Killer Queen, Kira goes to extreme lengths to erase anyone who discovers his identity.Blending small-town slice-of-life charm with a tense psychological cat-and-mouse hunt, Part 4 is a brilliant battle of wits as Morioh's quirky residents unite to corner a monster hiding in plain sight.Golden Wind (or Vento Aureo) relocates the epic saga to Italy, following Giorno Giovanna, a charismatic young petty criminal living in Naples. Despite carrying the birthmark of the Joestar bloodline, Giorno is secretly the biological son of the infamous villain DIO. Rather than following a path of evil, Giorno harbors a noble dream: to rise through the ranks of Passione, the country's most powerful and ruthless mafia syndicate, and overthrow its mysterious boss to stop the flow of drugs to children.Giorno's ambition becomes reality when he allies with Bruno Bucciarati, a compassionate capo within Passione who despises the boss's illicit drug trade. After proving his worth, Giorno joins Bucciarati's renegade squad—which includes the hot-headed Guido Mista, the sharp-witted Narancia Ghirga, the meticulous Pannacotta Fugo, and the disciplined ex-cop Leone Abbachio.Together, the crew turns traitor against the mafia, embarking on a treacherous cross-country mission to protect the boss's estranged daughter, Trish Una, while simultaneously trying to uncover the boss's true identity. Their journey is a relentless gauntlet of brutal encounters against elite hit squads sent by the syndicate.The conflict reaches its apex in a desperate race against the boss, whose Stand, King Crimson, can erase time itself and see the future. Featuring high-stakes mafia warfare, gorgeous Italian aesthetics, and the evolution of Giorno's life-giving Stand into Gold Experience Requiem, Part 5 is a cinematic tale of betrayal, absolute resolve, and rewriting destiny.",
    logoImage:"/images/Logo/Jojo_Bizzare_Adventure.png",
    characterImage:"/images/Characters_Logo/Jojo_Bizzare_Adventure.png",
    testLink:"/tests/jojo-bizzare-adventure"
  },
  {
    id:"jujutsu-kaisen",
    title:"JUJUTSU KAISEN",
    plot:"Jujutsu Kaisen follows Yuji Itadori, an athletic high schooler living in Sendai who prefers hanging out with the Occult Research Club over joining school sports teams. His normal life shatters when his club members unseal a rotting, cursed talisman containing a finger belonging to Sukuna Ryomen, the undisputed King of Curses. The talisman draws a flood of malevolent monsters known as Curses—manifestations born from humanity's negative emotions. To save his friends, Yuji swallows the finger, becoming the host to Sukuna.Although standard Jujutsu protocol dictates that a cursed vessel must be immediately executed, the powerful and eccentric sorcerer Satoru Gojo intervenes. He arranges a temporary stay of execution on one condition: Yuji must locate and consume all remaining twenty of Sukuna's fingers so the king of curses can be permanently destroyed once and for all.Yuji is enrolled in Tokyo Jujutsu High, where he joins a tight-knit first-year class alongside Megumi Fushiguro, a solemn sorcerer capable of summoning shadow beasts, and Nobara Kugasaki, a sharp-tongued, fiercely independent user of straw-doll technique. Guided by their senior instructors, the trio dives into a hidden, brutal underworld of sorcery where they battle terrifying curses using cursed energy, domain expansions, and intricate martial techniques.As the series progresses, the scope expands into a devastating ideological war orchestrated by Kenjaku, an ancient sorcerer possessing bodies, and Mahito, a nihilistic curse embodying hatred for humanity. The conflict shatters the safety of the Jujutsu world, culminating in the catastrophic Shibuya Incident—a massive, city-wide ambush that tests the absolute limits, sanity, and survival of every sorcerer.Renowned for its fluid, high-octane choreography, complex moral ambiguity, and unforgettable cast of characters, Jujutsu Kaisen is a modern dark fantasy masterpiece about the heavy cost of protecting others and what it means to die without regrets.",
    logoImage:"/images/Logo/Jujutsu_Kaisen.png",
    characterImage:"/images/Characters_Logo/Jujutsu_Kaisen_Logo.png",
    testLink:"/tests/jujutsu-kaisen"
  },
  {
    id:"kuroko-no-basket",
    title:"KUROKO NO BASKET",
    plot:"Kuroko's Basketball follows Tetsuya Kuroko, a quiet and seemingly ordinary first-year high school student who joins the basketball team at Seirin High. Despite his lack of physical stamina and scoring ability, Kuroko carries a legendary secret as the former Phantom Sixth Man of the Generation of Miracles, an invincible middle school team of basketball prodigies. At Seirin, he forms an unstoppable partnership with Taiga Kagami, a towering and fiercely competitive player who returned from America with explosive athletic talent. Together, Kuroko acts as an invisible shadow using misdirection and rapid passing, while Kagami serves as the brilliant light that draws the defense. Their ultimate goal is to lead Seirin High to the national championship and defeat the members of the Generation of Miracles, forcing Kuroko to confront his former teammates and their overwhelming, specialized skills. As the team progresses through grueling regional and national tournaments, Seirin relies on deep resilience, tactical ingenuity, and unbreakable teamwork to overcome opponents who rely solely on individual genius. Through intense matches and psychological duels, the narrative explores the true meaning of basketball camaraderie, transforming high school sports into an epic clash of wills, strategy, and cooperation.",
    logoImage:"/images/Logo/Kuroko_No_Basket.png",
    characterImage:"/images/Characters_Logo/Kuroko_No_Basket_Logo.png",
    testLink:"/tests/kuroko-no-basket"
  },
  {
    id:"mob-psycho-100",
    title:"MOB PSYCHO 100",
    plot:"Mob Psycho 100 follows Shigeo  Kakegawa, an unassuming and emotionally repressed middle school boy who happens to be an overwhelmingly powerful esper capable of telekinesis, pyrokinesis, and astral projection. Despite possessing god-tier psychic abilities that could easily level a city, Mob desperately wants to live a normal, socially fulfilling life. He knows that his powers are dangerous and destructive, so he keeps his emotions tightly locked away behind a numerical meter. When his emotional accumulator reaches 100 percent, his suppressed feelings unleash a cataclysmic explosion of raw, uncontrollable psychic force.Seeking guidance on how to control his powers and improve himself as a person, Mob becomes the apprentice to Reigen Arataka, a charismatic, quick-witted con artist who runs a cheap psychic consultation agency. While Reigen is a total fraud who uses fake exorcisms and relies entirely on Mob to handle actual supernatural threats, he genuinely acts as a surrogate father figure, teaching Mob important moral lessons about empathy, self-worth, and how to navigate the complexities of everyday life without resorting to his powers.As the series unfolds, Mob’s quiet existence is repeatedly disrupted by dangerous cults, rival psychics, malevolent spirits, and a shadowy global organization known as Claw that seeks world domination. Along the way, Mob builds genuine friendships and forms deep bonds with a colorful cast of characters, including his academically gifted younger brother Ritsu, the reformed ex-bully Dimps (a conniving high-level evil spirit who latches onto Mob), and Teruki Hanazawa, a former arrogant esper who becomes one of Mob's closest allies.Renowned for its breathtaking, fluid animation, phenomenal character growth, and profound emotional depth, Mob Psycho 100 subverts typical superhero tropes. It is a heartwarming and visually stunning exploration of personal growth, self-acceptance, and the truth that having extraordinary powers doesn't make you any better than anyone else.",
    logoImage:"/images/Logo/Mob_Psycho.png",
    characterImage:"/images/Characters_Logo/Mob_Psycho_100_Logo.png",
    testLink:"/tests/mob-psycho-100"
  },
  {
    id:"mushoku-tensei",
    title:"MUSHOKU TENSEI",
    plot:"Mushoku Tensei: Jobless Reincarnation follows an unnamed, 34-year-old shut-in hikikomori who dies in squalor after wasting his life avoiding society and failing to attend his own parents' funeral. Given a second chance at life, he is reincarnated into a magical medieval fantasy world as Rudeus Greyrat, the newborn son of a swordsman knight and a healer mother. Determined not to repeat the miserable, stagnant mistakes of his past life, Rudeus resolves to live this new existence to the absolute fullest, maintaining his inner adult intellect while developing an early, prodigious talent for magic.As Rudeus grows, his journey spans a sweeping, lifelong coming-of-age epic. He is initially tutored in magic by a brilliant demon mage named Roxy Migurdia, learns swordsmanship from his father, and forms a deep bond with his quarter-elf childhood friend, Sylphiette. However, his peaceful childhood is abruptly shattered by a cataclysmic magical disaster known as the Mana Calamity, which teleports Rudeus and his haughty, violent young cousin, Eris Boreas Greyrat, to the hazardous, monster-infested Demon Continent.Stranded thousands of miles from home, Rudeus, Eris, and a disgraced Superd warrior named Ruijerd Sparda form a mercenary party called Dead End to survive the treacherous journey back. Along the way, Rudeus must confront his deep-seated psychological trauma, overcome severe personal flaws, and master advanced incantationless magic. The narrative later follows his young adult years as he enrolls in the elite Ranoa University of Magic to seek a cure for his chronic somatic ailments, reuniting with old friends, navigating complex romantic relationships, and eventually uncovering the grand, mysterious machinations of the world's overarching cosmic entities.",
    logoImage:"/images/Logo/Mushoku_Tensei.png",
    characterImage:"/images/Characters_Logo/Mushoku_Tensei_Logo.png",
    testLink:"/tests/mushoku-tensei"
  },
  {
    id:"my-hero-academia",
    title:"MY HERO ACADEMIA",
    plot:"My Hero Academia follows Izuku Midoriya, a timid and powerless boy born into a world where eighty percent of the global population possesses superhuman abilities known as Quirks. Despite dreaming of becoming a legendary hero like his idol, the invincible symbol of peace All Might, Izuku is diagnosed as completely quirkless, leaving him bullied, isolated, and crushed under the weight of his own limitations.His life changes forever when a fateful encounter with All Might reveals his hidden, self-sacrificing heroism. Impressed by Izuku's unbreakable spirit, All Might passes down his own legendary, transferable Quirk: One For All, a sacred power that stockpiles physical strength across generations. To inherit this god-tier ability and survive its immense physical toll, Izuku undergoes grueling training before enrolling in U.A. High School, the premier academy for aspiring heroes.At U.A., Izuku joins the elite Class 1-A, where he is surrounded by a diverse and fiercely talented roster of peers, including the explosive and hot-headed Katsuki Bakugo (his childhood rival), the gravity-defying Ochaco Uraraka, and the analytical genius Tenya Ida. Together, under the guidance of strict instructors like Eraser Head, the students face rigorous trials, school festivals, and unexpected, life-threatening ambushes by villains.The narrative darkens significantly as a shadowy terrorist organization known as the Paranormal Liberation Front, led by the terrifying, quirk-stealing mastermind Tomura Shigaraki and the puppet-master All For One, launches a nationwide war to destroy hero society. Pushed to the brink of collapse, Izuku and his fellow heroes must wage a devastating, all-out conflict to protect humanity.",
    logoImage:"/images/Logo/My_Hero_Academia.png",
    characterImage:"/images/Characters_Logo/My_Hero_Academia_Logo.png",
    testLink:"/tests/my-hero-academia"
  },
  {
    id:"one-piece",
    title:"ONE PIECE",
    plot:"One Piece follows Monkey D. Luffy, an optimistic and rubber-bodied teenager who sets sail from the East Blue with a grand dream of finding the legendary treasure left behind by Gol D. Roger and becoming the King of the Pirates. To conquer the perilous waters of the Grand Line and the New World, Luffy gradually gathers a loyal, eccentric crew of specialists—including the master swordsman Roronoa Zoro, navigator Nami, sniper Usopp, chef Sanji, doctor Tony Tony Chopper, archaeologist Nico Robin, shipwright Franky, musician Brook, and helmsman Jinbe. As the Straw Hat Pirates navigate vast seas, bizarre sky islands, and industrial fortresses, their journey evolves from simple island-hopping adventures into a massive global epic. Along the way, they clash against corrupt military organizations, tyrannical warlords, and the shadowy authorities of the World Government, fighting tirelessly to liberate oppressed nations and uncover the forbidden history of the world. Renowned for its staggering world-building, intricate multi-decade plotting, and deep emotional resonance, One Piece is a masterclass in adventure storytelling that explores profound themes of liberty, dreams, systemic corruption, and the unbreakable bond of chosen family.",
    logoImage:"/images/Logo/One_Piece.png",
    characterImage:"/images/Characters_Logo/One_Piece_Logo.png",
    testLink:"/tests/one-piece"
  },
  {
    id:"one-punch-man",
    title:"ONE PUNCH MAN",
    plot:"One-Punch Man follows Saitama, an unimposing and bored young man who trained so intensely that he achieved god-tier strength, allowing him to obliterate any opponent with a single punch, though this absolute power has left him crippled by chronic boredom and existential apathy. After reluctantly taking on Genos, a earnest cyborg youth, as his official disciple, Saitama registers with the bureaucratic Hero Association to gain recognition, thrusting himself into a world of eccentric superheroes and escalating global threats. As the narrative expands from localized monster attacks to apocalyptic catastrophes orchestrated by mysterious organizations and cosmic entities, the series explores a colorful roster of fellow heroes grappling with their own limitations. Renowned for its breathtaking fight choreography, sharp satire of classic superhero tropes, and brilliant comedic timing, One-Punch Man is a clever subversion of the traditional action genre that examines the hilarious and surprisingly poignant toll of being completely unbeatable.",
    logoImage:"/images/Logo/One_Punch_Man.png",
    characterImage:"/images/Characters_Logo/One_Punch_Man_Logo.png",
    testLink:"/tests/one-punch-man"
  },
  {
    id:"oshi-no-ko",
    title:"OSHI NO KO",
    plot:"Oshi no Ko follows Goro Honda, a rural obstetrician and devoted fan of the rising 16-year-old idol Ai Hoshino, whose life is cut short when he is murdered by an obsessive stalker just as Ai arrives at his hospital heavily pregnant with twins. Reincarnated as Aquamarine Hoshino, one of Ai's newborn twins alongside his sister Ruby, Goro retains his adult intellect and memories, only for their peaceful childhood to shatter when the same stalker brutally murders Ai in their home. Driven by a consuming thirst for vengeance, Aqua uses his industry connections and sharp intellect to unearth the dark entertainment conspiracy that orchestrated her death, while both twins enter the brutal, high-stakes world of show business themselves—Aqua as a morally complex actor navigating psychological manipulation and Ruby as an aspiring idol. Along the way, they form intense bonds with talented peers like Kana Arima and Akane Kurokawa while exposing the toxic underbelly of fame and manufactured perfection. Renowned for its razor-sharp industry critique, gripping thriller elements, and deep emotional resonance, Oshi no Ko is a genre-bending masterpiece about grief, ambition, and the dark cost of the spotlight.",
    logoImage:"/images/Logo/Oshi_No_Oko.png",
    characterImage:"/images/Characters_Logo/Oshi_No_Ko_Logo.png",
    testLink:"/tests/oshi-no-ko"
  },
  {
    id:"parasyte-the-maxim",
    title:"PARASYTE THE MAXIM",
    plot:"Parasyte: The Maxim follows Shinichi Izumi, an ordinary high school student whose life is abruptly upended when a worm-like alien parasite fails to burrow into his brain, forcing it to take over his right hand instead. Named Migi, this parasitic organism is trapped in Shinichi's arm, creating a bizarre and reluctant partnership as they are forced to defend themselves against other ruthless parasites that have successfully consumed human brains and now feed on society in disguise. Combining Shinichi's human empathy with Migi's lethal shape-shifting blades and cold logic, the hybrid duo navigates a terrifying hidden war. Along the way, Shinichi struggles to keep his humanity intact while confronting complex foes like Reiko Tamura, who experiments with motherhood. Renowned for its gripping body horror and profound existential questions, the series explores evolution and morality.",
    logoImage:"/images/Logo/Parasyte_The_Maxim.png",
    characterImage:"/images/Characters_Logo/Parasyte_Logo.png",
    testLink:"/tests/parasyte-the-maxim"
  },
  {
    id:"psycho-pass",
    title:"PSYCHO PASS",
    plot:"Psycho-Pass is set in a dystopian, highly automated 22nd-century Japan governed by the Sibyl System, a sprawling quantum computer network that continuously scans and measures the mental states, personalities, and psychological inclinations of every citizen. This quantitative assessment produces a numerical score known as a Psycho-Pass, and if an individual's Crime Coefficient exceeds acceptable thresholds due to rising stress, anger, or latent criminal intent, the system flags them as potential threats and authorizes enforcement action before any actual crime can be committed. The narrative follows Akane Tsunemori, a bright, idealistic rookie inspector who joins the Public Safety Bureau's Criminal Investigation Division. Alongside her, the elite enforcement squad consists of Enforcers—latent criminals whose high Crime Coefficients mean they are legally barred from normal society, forced instead to hunt down other offenders under the strict oversight of Inspectors like Akane. Her most prominent partner is Shinya Kogami, a brooding, brilliant former inspector whose obsessive drive to solve cases has pushed his own mental state dangerously close to the breaking point. As Akane and her team investigate a series of increasingly complex and gruesome murders, they uncover a terrifying mastermind named Shogo Makishima. Unlike ordinary criminals, Makishima possesses a naturally clouded or completely untraceable Psycho-Pass, rendering him entirely invisible to the Sibyl System and allowing him to manipulate desperate citizens into committing atrocities without triggering the automated societal alarms. Through their deadly cat-and-mouse game across the sprawling, rain-slicked cyberpunk metropolis, Makishima exposes the horrifying, systemic flaws at the very heart of the Sibyl System, forcing Akane to question the absolute justice of an algorithm that rules society by stripping away human free will, authentic choice, and moral agency. Renowned for its sleek futuristic aesthetics, deep philosophical grounding in ethics, sociology, and classic literature, and gripping psychological suspense, Psycho-Pass stands as a masterclass in sci-fi storytelling that explores the chilling price of absolute security, pervasive state surveillance, and the enduring resilience of the human conscience.",
    logoImage:"/images/Logo/Psycho_Pass.png",
    characterImage:"/images/Characters_Logo/Psycho_Pass_Logo.png",
    testLink:"/tests/psycho-pass"
  },
  {
    id:"re-zero",
    title:"RE:ZERO",
    plot:"Re:Zero - Starting Life in Another World follows Subaru Natsuki, an ordinary and underachieving Japanese teenager who is suddenly and inexplicably summoned to a fantastical medieval world while walking home from a convenience store. Left completely disoriented and lacking any extraordinary magical or physical prowess, Subaru quickly discovers that he possesses a terrifying and supernatural curse: a hidden power he calls Return by Death. Whenever he is brutally murdered, time rewinds, resurrecting him at a specific chronological checkpoint in the past while allowing him to retain all his memories of the harrowing, painful timelines that never actually happened to anyone else. Thrown headfirst into a complex and deadly royal political conspiracy, Subaru's initial optimistic expectations are swiftly shattered as he suffers through agonizingly gruesome deaths and deep psychological trauma, desperately trying to protect the people who show him kindness—most notably Emilia, a silver-haired half-elf royal candidate who first rescues him, and Rem, a fiercely devoted demon maid with her own haunting past. As Subaru navigates increasingly perilous loops involving murderous mabeasts, political assassins, and the sociopathic cultists of the Witch Cult led by terrifying Sin Archbishops, he is forced to confront his own profound character flaws, deep-seated insecurities, and toxic self-sacrificing hero complexes. Renowned for its unflinching deconstruction of the standard portal-fantasy genre, masterful mystery plotting, and harrowing emotional depth, Re:Zero stands as a psychological dark fantasy masterpiece that explores genuine resilience, painful self-acceptance, and the agonizing psychological cost of endlessly rewriting fate to secure a future where everyone survives.",
    logoImage:"/images/Logo/Re_Zero.png",
    characterImage:"/images/Characters_Logo/Re_Zero_Logo.png",
    testLink:"/tests/re-zero"
  },
  {
    id:"solo-levelling",
    title:"SOLO LEVELLING",
    plot:"Solo Leveling follows Sung Jinwoo, a chronically weak and perpetually injured E-rank hunter known in the global supernatural community as the Weakest Hunter of All Mankind. Set in a modern world where mysterious dimensional gates suddenly opened, connecting humanity to monster-infested dungeons, human hunters with magical abilities must clear these domains to protect cities from catastrophic ruin. Jinwoo ekes out a meager living risking his life in low-level dungeons just to pay for his comatose mother's mounting hospital bills and support his younger sister. His bleak existence changes forever when his raiding party enters an unusually lethal double dungeon, where a horrific massacre decimates most of his team. Left behind to sacrifice himself so the remaining survivors can escape, Jinwoo accepts his seemingly inevitable doom, only to wake up in a hospital bed with a bizarre, floating blue interface visible only to his eyes. This mysterious system designates him as a unique Player granting him access to an unprecedented, game-like progression mechanic complete with daily fitness quests, stat point allocations, inventory systems, and leveling notifications. Unlike every other hunter whose power is permanently capped from awakening, Jinwoo discovers that he is the only person in existence who can infinitely grow stronger by grinding through instanced dungeons, defeating monstrous foes, and clearing arduous trials. As he rapidly ascends from the absolute bottom tier to an unfathomable level of superhuman might, Jinwoo's physical appearance transforms, his cold tactical intellect sharpens, and he unlocks the terrifying ability to extract the shadows of defeated enemies—both beasts and human foes alike—commanding an ever-expanding, loyal army of undead soldiers. His solitary climb eventually draws the intense scrutiny of international guilds, national-level hunters, and hidden sovereign entities, thrusting him into a massive, high-stakes global conspiracy involving ancient monarchs and rulers battling across dimensions. Renowned for its breathtaking action choreography, razor-sharp pacing, and exhilarating power-fantasy progression, Solo Leveling is a modern manhwa masterpiece that explores resilience, absolute dominance, and the relentless pursuit of strength.",
    logoImage:"/images/Logo/Solo_Levelling.png",
    characterImage:"/images/Characters_Logo/Solo_Levelling_Logo.png",
    testLink:"/tests/solo-levelling"
  },
  {
    id:"spy-x-family",
    title:"SPY X FAMILY",
    plot:"Spy x Family follows Twilight, a master spy operating for Westalis who must execute the most critical mission of his career to prevent a catastrophic war with neighboring Ostania: build an ordinary family in under a week to get close to a reclusive, high-ranking political target. To fulfill this impossible cover, Twilight adopts the persona of Loid Forger, a suave psychiatrist, and hastily adopts Anya, a bright-eyed young orphan. Unbeknownst to Loid, Anya is secretly a telepath who can read minds, and she is utterly thrilled by her father spy gadgets and secret identity. To complete the domestic illusion, Loid crosses paths with Yor Briar, a gentle, soft-spoken municipal worker who secretly moonlights as a ruthless, legendary assassin known as the Thorn Princess. Desperate for her own cover to avoid suspicion from the secret police, Yor agrees to enter into a marriage of convenience with Loid, completely unaware that her new husband is a spy and her adopted daughter is a mind-reader. As this delightfully dysfunctional trio moves into a suburban home, each member harbors deep, life-threatening secrets from the others while genuinely growing to care for one another as a real family. The narrative primarily revolves around their hilarious, high-stakes attempts to maintain their suburban facade while Anya navigates the prestigious Eden Academy, trying to befriend the target's snobbish son to secure invitations for elite social mixers. Renowned for its brilliant blend of high-octane espionage action, heartwarming domestic comedy, and stellar character dynamics, Spy x Family is a charming masterpiece that explores the power of found family against the backdrop of Cold War-era intrigue.",
    logoImage:"/images/Logo/Spy_X_Family.png",
    characterImage:"/images/Characters_Logo/Spy_X_Family.png",
    testLink:"/tests/spy-x-family"
  },
  {
    id:"steins-gate",
    title:"STEINS:GATE",
    plot:"Steins;Gate follows Rintaro Okabe, an eccentric, self-proclaimed mad scientist who runs the Future Gadget Laboratory out of a cramped Tokyo apartment alongside his loyal childhood friend Mayuri Shiina and genius hacker Itaru Hashida. Their mundane days of inventing absurd, useless contraptions change forever when they accidentally invent the Phone Microwave a modified device capable of sending text messages back in time. As Okabe and brilliant neuroscientist Kurisu Makise experiment further with these D-mails, they trigger a massive ripple effect that alters past events and draws the sinister attention of SERN, a shadowy international research organization secretly experimenting with human time travel. The stakes escalate into a harrowing nightmare when SERN tracks their technology, and Mayuri is repeatedly and ruthlessly murdered across multiple divergent timelines, plunging Okabe into an endless, agonizing loop of despair. Driven by absolute desperation, Okabe utilizes a newly invented time-leap machine to endlessly replay the exact same days, sacrificing his own sanity and emotional stability as he fights every possible combination to save Mayuri, only to realize he is trapped in a bitter, globe-spanning conspiracy alongside a futuristic resistance fighter named Suzuha Amane. As the narrative shifts from a quirky, lighthearted sci-fi comedy into a tense, emotionally devastating psychological thriller, Okabe must confront the terrifying butterfly effects of his actions and navigate the fragile fabric of causality. Renowned for its masterful plotting, intricate timeline mechanics, unforgettable character chemistry, and brilliant exploration of cause and effect, Steins;Gate stands as an undisputed masterpiece of science fiction that examines obsession, sacrifice, and the heavy, agonizing price of rewriting history to secure a brighter future.",
    logoImage:"/images/Logo/Steins_Gate.png",
    characterImage:"/images/Characters_Logo/Steins_Gate_Logo.png",
    testLink:"/tests/steins-gate"
  },
  {
    id:"sword-art-online",
    title:"SWORD ART ONLINE",
    plot:"Sword Art Online follows Kirito, a skilled teenage beta tester who finds himself trapped alongside ten thousand other players inside a revolutionary, fully immersive virtual reality massively multiplayer online role-playing game. Released in the year 2022, the game's sadistic creator, Akihiko Kayaba, shatters their reality on launch day by locking the logout button and announcing a terrifying ultimatum: players cannot escape until they clear all one hundred floors of the towering floating labyrinth known as Aincrad, and if their in-game avatar's health points drop to zero, their real-world brain is instantly fried by the NerveGear headset's microwave emitters. Thrust into this deadly digital death game where virtual actions have lethal, irreversible consequences, Kirito initially chooses to become a solitary player to protect others from his own emotional baggage, aggressively grinding solo to survive the brutal front lines. However, his isolated routine is permanently upended when he crosses paths with Asuna Yuuki, a fierce and exceptionally talented female swordsman who forces him to see the value of cooperation and human connection within the digital wasteland. As their partnership deepens into a profound romance, Kirito and Asuna unite with an elite guild of survivors to conquer nightmarish floor bosses, expose treacherous player-killing syndicates, and fight their way toward liberation. Beyond the initial death game, the narrative expands into subsequent virtual arcs—ranging from trapped fairy realms and lethal tournament-style shooter games to cutting-edge artificial intelligence experiments—exploring the ethical boundaries of immersive technology and the blurring lines between virtual existence and human consciousness. Renowned for its thrilling action choreography, iconic musical score, and trailblazing popularization of the modern portal-fantasy and virtual reality survival subgenres, Sword Art Online remains a landmark sci-fi adventure examining resilience, love, and the indomitable human spirit trapped behind screens.",
    logoImage:"/images/Logo/Sword_Art_Online.png",
    characterImage:"/images/Characters_Logo/Sword_Art_Online.png",
    testLink:"/tests/sword-art-online"
  },
  {
    id:"the-apothecary-diaries",
    title:"THE APOTHECARY DIARIES",
    plot:"The Apothecary Diaries follows Maomao, a pragmatic, quick-witted young apothecary possessing an encyclopedic knowledge of botany, toxicology, and medicine who is abruptly kidnapped and sold into indentured servitude within the sprawling, highly ritualized inner court of the Emperor's palace. Raised by her eccentric adoptive father in Beijing's notoriously hedonistic pleasure district, Maomao initially desires nothing more than to keep her head down and quietly serve out her contract as a lowly palace maid until she can finally regain her freedom. However, her deliberate efforts to remain invisible are utterly derailed when she cannot resist using her clandestine pharmaceutical expertise to covertly investigate a mysterious, life-threatening illness plaguing the Emperor's infant heirs. Her brilliant deduction saves the royal children but inadvertently catches the keen, calculating eye of Jinshi, a breathtakingly handsome and immensely influential imperial eunuch who serves as a high-ranking court administrator. Recognizing her rare intellect, sharp cynicism, and fearless medical resourcefulness, Jinshi rapidly co-opts Maomao into becoming his personal poison taster and unofficial detective, dragging her headfirst into a labyrinthine world of palace intrigue, dark imperial conspiracies, lethal concubine rivalries, and deadly court politics. As Maomao navigates this dangerous ecosystem armed with little more than a morbid, unquenchable scientific fascination with toxins, anatomical oddities, and chemical antidotes, she solves a series of complex medical mysteries that threaten the stability of the entire royal court. Alongside her evolving, delightfully tension-filled dynamic with the exasperated Jinshi, Maomao uncovers deeper secrets linking her own enigmatic heritage to the highest echelons of imperial power. Renowned for its razor-sharp historical detail, brilliant analytical protagonist, and masterful blend of medical procedural drama with subtle political intrigue, The Apothecary Diaries is a captivating masterpiece that celebrates intellect, resilience, and the relentless pursuit of truth within the gilded cage of ancient royal",
    logoImage:"/images/Logo/The Apothecary Diaries.png",
    characterImage:"/images/Characters_Logo/Apothecary_Diaries_Logo.png",
    testLink:"/tests/the-apothecary-diaries"
  },
  {
    id:"the-promised-neverland",
    title:"THE PROMISED NEVERLAND",
    plot:"The Promised Neverland follows Emma, Norman, and Ray, three exceptionally brilliant eleven-year-old orphans residing at Grace Field House, an idyllic, pastoral orphanage surrounded by thick woods and enclosed by a massive perimeter wall. Governed by a warm, maternal figure they affectionately call Mom, the children spend their days enjoying rigorous intelligence tests, playing tag in the sun, and living in a seemingly perfect bubble of love and security, operating under the strict rule that they must never venture past the gate or cross the boundary fence. Their idyllic childhood is shattered overnight when a young orphan named Conny is adopted, leading Emma and Norman to sneak past the forbidden gates to return her forgotten stuffed toy, only to discover a horrifying reality: Grace Field House is not a home, but a clandestine farm, and the children are being raised as gourmet livestock to be slaughtered and fed to terrifying, hyper-intelligent monsters known as demons. Determined to defy their predetermined fate as monstrous cuisine, Emma, Norman, and Ray covertly organize an intricate, high-stakes escape plan to liberate all the children before the oldest reach the age of twelve. Utilizing their genius intellects, they launch a high-stakes psychological chess match against Isabella and her ruthless sister Krone, navigating paranoia, betrayal, and relentless surveillance while uncovering a vast, global conspiracy that spans a divided world between human civilization and demonic overlords. As the narrative evolves from a claustrophobic, suspense-filled prison break into an epic survival saga across a ruined, hostile wilderness, the young escapees must confront moral ambiguity, cruelty, and the true cost of freedom. Renowned for its razor-sharp tactical plotting, relentless psychological tension, and brilliant subversion of the dark fantasy genre, The Promised Neverland is a gripping masterpiece that explores resilience, sacrifice, and the indomitable hope of children fighting against insurmountable odds.",
    logoImage:"/images/Logo/The_Promised_Neverland.png",
    characterImage:"/images/Characters_Logo/The_Promised_Neverland_Logo.png",
    testLink:"/tests/the-promised-neverland"
  },
  {
    id:"the-seven-deadly-sins",
    title:"THE SEVEN DEADLY SINS",
    plot:"The Seven Deadly Sins follows Meliodas, the charismatic captain of the titular band of disgraced legendary knights who were once framed for attempting to overthrow the kingdom of Liones, alongside his talking pig companion Hawk. Set in a breathtaking fantasy realm inspired by Arthurian legend, the narrative kicks off when Elizabeth Liones, the third princess of the kingdom, escapes the capital after the corrupt, power-hungry Holy Knights stage a violent coup d'état, imprisoning the royal family and plunging the nation into tyrannical rule. Desperate to save her homeland, Elizabeth sets out on a perilous quest to track down the Seven Deadly Sins, stumbling into Meliodas's tavern, the Boar Hat, and discovering that the cheerful tavern keeper is actually the legendary Dragon Sin of Wrath. Together, they embark on an epic, continent-spanning journey to reunite the scattered members of the order—including the jealous Serpent Sin of Envy Diane, the immortal Fox Sin of Greed Ban, the lazy Grizzly Sin of Sloth King, the reclusive Goat Sin of Lust Gowther, the proud Boar Sin of Gluttony Merlin, and the monstrous Lion Sin of Pride Escanor. As the reunited knights confront the tyrannical Holy Knights, they gradually uncover a much darker, multi-millennial conspiracy orchestrated by powerful demon clans, ancient deities, and sacred curses that bind Meliodas and Elizabeth in a tragic, reincarnating cycle of star-crossed love. Along the way, the series dives headfirst into massive, earth-shattering magical battles, high-stakes political betrayals, and deep character backstories that reveal the tragic personal costs behind each hero's branded sin. Renowned for its explosive action choreography, rich world-building, and dynamic ensemble cast, The Seven Deadly Sins is an exhilarating epic fantasy that celebrates loyalty, redemption, and the ultimate triumph of love over ancient malice.",
    logoImage:"/images/Logo/The_Seven_Deadly_Sins.png",
    characterImage:"/images/Characters_Logo/Nanatsu_No_Taizai_Logo.png",
    testLink:"/tests/the-seven-promised-sins"
  },
  {
    id:"tokyo-ghoul",
    title:"TOKYO GHOUL",
    plot:"Tokyo Ghoul follows Ken Kaneki, a timid, bookish university student whose quiet life is shattered when a devastating date with a beautiful girl named Rize Kamishiro ends in a brutal tragedy; Rize is revealed to be a flesh-eating ghoul—a predatory creature that looks human but survives solely on human flesh—and is crushed by falling steel beams during an ambush. Rushed to a hospital on the brink of death, Kaneki is saved only when the surgeon desperately transplants Rize's harvested organs into his body, transforming him overnight into a tortured, one-eyed hybrid who can no longer stomach normal food and must consume human flesh to survive. Thrust into the terrifying, hidden underworld of Tokyo's ghoul society, Kaneki is taken in by Anteiku, a peaceful cafe run by benevolent ghouls who try to coexist with humans while managing their monstrous hunger. However, his fragile new existence is violently upended when he is captured, imprisoned, and subjected to horrific, sadistic torture by a psychotic ghoul extremist named Jason, an ordeal that breaks his mind and forces him to accept his inner monster, symbolized by his hair turning stark white and his embracing of his own predatory nature. As the narrative escalates into an all-out war between the secret government counter-ghoul agency, the CCG, and radical ghoul factions, Kaneki is caught in a bloody struggle for identity, morality, and survival. Renowned for its haunting gothic atmosphere, harrowing psychological deconstruction of trauma, and visceral action choreography, Tokyo Ghoul is a dark Seinen masterpiece that explores the agonizing gray area between monster and man in a hostile society.",
    logoImage:"/images/Logo/Tokyo_Ghoul.png",
    CharacterImage:"/images/Characters_Logo/Tokyo_Ghoul_Logo.png",
    testLink:"/tests/the-seven-promised-sins"

  }

];

export default function AnimeTriviaPage() {
  const [selectedAnime, setSelectedAnime] = useState(animeData[0]);
  const [startIndex, setStartIndex] = useState(0);

  const VISIBLE_COUNT = 4;

  const handleScrollUp = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  const handleScrollDown = () => {
    if (startIndex + VISIBLE_COUNT < animeData.length) {
      setStartIndex(startIndex + 1);
    }
  };

  const visibleAnimes = animeData.slice(startIndex, startIndex + VISIBLE_COUNT);

  return (
    <div className="bg-white min-h-screen p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-8 items-start">
        
        {/* COLOMNA 1: Săgeți și 4 Logo-uri */}
        <div className="col-span-2 flex flex-col items-center space-y-8 py-6">
          <button 
            onClick={handleScrollUp}
            disabled={startIndex === 0}
            className={`w-12 h-8 flex items-center justify-center transition-opacity ${
              startIndex === 0 ? 'opacity-20 cursor-not-allowed' : 'hover:scale-110'
            }`}
          >
            <span className="text-2xl font-bold text-red-600">▲</span>
          </button>

          <div className="flex flex-col space-y-12 w-full items-center py-4">
            {visibleAnimes.map((anime) => {
              const isSelected = selectedAnime.id === anime.id;
              return (
                <button
                  key={anime.id}
                  onClick={() => setSelectedAnime(anime)}
                  className={`relative transition-all duration-300 ease-out flex items-center justify-center focus:outline-none ${
                    isSelected 
                      ? 'scale-200 z-20 drop-shadow-lg' 
                      : 'scale-100 z-10 opacity-60 hover:opacity-100 hover:scale-110'
                  }`}
                >
                  <div className="w-24 h-16 relative">
                    <Image 
                      src={anime.logoImage} 
                      alt={anime.title} 
                      fill 
                      className="object-contain" 
                    />
                  </div>
                </button>
              );
            })}
          </div>

          <button 
            onClick={handleScrollDown}
            disabled={startIndex + VISIBLE_COUNT >= animeData.length}
            className={`w-12 h-8 flex items-center justify-center transition-opacity ${
              startIndex + VISIBLE_COUNT >= animeData.length ? 'opacity-20 cursor-not-allowed' : 'hover:scale-110'
            }`}
          >
            <span className="text-2xl font-bold text-red-600">▼</span>
          </button>
        </div>

        {/* COLOMNA 2: Zona Centrală (Titlu, Plot cu scroll, Take the Test) */}
<div className="col-span-7 flex flex-col space-y-6">
  <div className="p-4 text-center bg-white">
    <h1 
      style={{ fontFamily: "'GrumpfhFont', sans-serif" }}
      className="text-3xl font-bold text-gray-900 tracking-wide"
    >
      {selectedAnime.title}
    </h1>
  </div>

  <div className="bg-white min-h-[420px] flex flex-col justify-between">
    <div 
      style={{ fontFamily: "'Times New Roman', Times, serif" }}
      className="text-red-600 text-lg italic leading-relaxed overflow-y-auto max-h-[300px] pr-4"
    >
      <p>{selectedAnime.plot}</p>
    </div>

    <div className="pt-6 mt-4">
      <Link
        href={selectedAnime.testLink}
        className="inline-block px-8 py-3 border-2 border-red-600 rounded-lg text-red-600 font-bold uppercase tracking-widest text-sm hover:bg-red-600 hover:text-white transition text-center"
      >
        Take the test
      </Link>
    </div>
  </div>
</div>

        {/* COLOMNA 3: Personajul Reprezentativ (FĂRĂ chenar roșu, imagine mărită) */}
        <div className="col-span-3 flex flex-col items-center justify-center pt-2">
          <div className="w-full flex flex-col items-center space-y-4">
            <div className="w-full h-[580px] relative overflow-visible flex items-center justify-center">
           <Image
  src={selectedAnime.characterImage ?? "/placeholder-character.png"}
  alt={selectedAnime.characterName || selectedAnime.title}
  fill
  className="object-contain drop-shadow-xl"
/>
            </div>

            <h3 className="font-bold text-gray-800 text-lg text-center tracking-wider uppercase">
              {selectedAnime.characterName}
            </h3>
          </div>
        </div>

      </div>
    </div>
  );
}