<?php

namespace App\DataFixtures;

use App\Entity\Education;
use App\Entity\Experience;
use App\Entity\Freelancer;
use App\Entity\Post;
use App\Entity\Project;
use App\Entity\Skill;
use App\Entity\SocialNetwork;
use App\Entity\Tag;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class AppFixtures extends Fixture
{
    private $encoder;

    public function __construct(UserPasswordEncoderInterface $encoder)
    {
        $this->encoder = $encoder;
    }

    public function load(ObjectManager $manager)
    {
        $freelancer = new Freelancer();
        $freelancer->setEmail('weiyi.li713@gmail.com');
        $freelancer->setTitle('Web Developer');
        $freelancer->setFirstName('Julian');
        $freelancer->setLastName('Li');
        $freelancer->setUsername('julian');
        $freelancer->setAddress('530 Collins Street, Melbourne VIC');

        $password = $this->encoder->encodePassword($freelancer, 'abcd');
        $freelancer->setPassword($password);

        $freelancer->setDescription('I am always open and would like to gain insights into the new ideas, technology and cool things. I worship my life and diligent in my work so much as I keep learning, thinking, evolving and growing.');

        $education = new Education();
        $education->setDegree('Masters of Business Information System');
        $education->setDateRange('2012 - 2013');
        $education->setUniversity('Monash');
        $education->setFreelancer($freelancer);

        $experience1 = new Experience();
        $experience1->setDateRange('2012 - 2015');
        $experience1->setCompany('Obee');
        $experience1->setDescription('Worked as part of a multi-disciplinary team, carrying out ad-hoc tasks as requested by the IT Manager. Had a specific brief to ensure the websites build for customer’s precisely matched their requirements.developers and marketers.');
        $experience1->setJobTitle('Web Developer');
        $experience1->setFreelancer($freelancer);

        $experience2 = new Experience();
        $experience2->setDateRange('2016 - Current');
        $experience2->setCompany('Pepperstone');
        $experience2->setDescription('I was responsible for working on a range of projects, designing appealing websites and interacting on a daily basis with graphic designers, back-end developers and marketers.');
        $experience2->setJobTitle('Back-End Developer');
        $experience2->setFreelancer($freelancer);

        $skill1 = new Skill();
        $skill1->setFreelancer($freelancer);
        $skill1->setName('Symfony');
        $skill1->setScore(90);

        $skill2 = new Skill();
        $skill2->setFreelancer($freelancer);
        $skill2->setName('PHP & Mysql');
        $skill2->setScore(90);

        $skill3 = new Skill();
        $skill3->setFreelancer($freelancer);
        $skill3->setName('CI/CD Pipeline');
        $skill3->setScore(80);

        $skill4 = new Skill();
        $skill4->setFreelancer($freelancer);
        $skill4->setName('Javascript');
        $skill4->setScore(70);

        $skill5 = new Skill();
        $skill5->setFreelancer($freelancer);
        $skill5->setName('AWS');
        $skill5->setScore(70);

        $skill6 = new Skill();
        $skill6->setFreelancer($freelancer);
        $skill6->setName('Ansible');
        $skill6->setScore(75);

        $sn1 = new SocialNetwork();
        $sn1->setFreelancer($freelancer);
        $sn1->setIcon('rsicon-github');
        $sn1->setLink('https://github.com/liweiyi88');

        $sn2 = new SocialNetwork();
        $sn2->setFreelancer($freelancer);
        $sn2->setIcon('rsicon-linkedin');
        $sn2->setLink('https://www.linkedin.com/in/jweiyi/');

        $sn3 = new SocialNetwork();
        $sn3->setFreelancer($freelancer);
        $sn3->setIcon('rsicon-twitter');
        $sn3->setLink('https://twitter.com/liweiyi88?lang=en');

        $p1 = new Project();
        $p1->setFreelancer($freelancer);
        $p1->setLink('http://symfony.com/');
        $p1->setTitle('Street Photography');
        $p1->setTag('Photography');
        $p1->setShortDescription('Street photography is photography that features the chance encounters and random accidents within public places.');
        $p1->setDescription('<p>Street photography does not necessitate the presence of a street or even the urban environment. Though people usually feature directly, street photography might be absent of people and can be an object or environment where the image projects a decidedly human character in facsimile or aesthetic.</p>');
        $p1->setCoverImageStyleSize(22);
        $p1->setCoverImageUrl('img/uploads/portfolio/portfolio-thumb-05-610x600.jpg');
        $p1->setInnerImageUrl('img/uploads/portfolio/portfolio-thumb-05-large.jpg');

        $p2 = new Project();
        $p2->setFreelancer($freelancer);
        $p2->setLink('https://www.apple.com/');
        $p2->setTitle('Suspension Bridge');
        $p2->setTag('Bridge');
        $p2->setShortDescription('Suspension Bridges - Design Technology');
        $p2->setDescription('<p>Suspension bridges in their simplest form were originally made from rope and wood.
                                                    Modern suspension bridges use a box section roadway supported by high tensile
                                                    strength cables.
                                                    In the early nineteenth century, suspension bridges used iron chains for cables. The
                                                    high tensile cables used in most modern suspension
                                                    bridges were introduced in the late nineteenth century.<br/>
                                                    Today, the cables are made of thousands of individual steel wires bound tightly
                                                    together. Steel, which is very strong under tension, is
                                                    an ideal material for cables; a single steel wire, only 0.1 inch thick, can support
                                                    over half a ton without breaking.</p>

                                                <p>Light, and strong, suspension bridges can span distances from 2,000 to 7,000 feet far
                                                    longer than any other kind of bridge. They are
                                                    ideal for covering busy waterways.</p>

                                                <p>With any bridge project the choice of materials and form usually comes down to cost.
                                                    Suspension bridges tend to be the most expensive to build. A suspension bridge
                                                    suspends the roadway from huge main cables, which extend
                                                    from one end of the bridge to the other. These cables rest on top of high towers and
                                                    have to be securely anchored into the bank at either
                                                    end of the bridge. The towers enable the main cables to be draped over long
                                                    distances. Most of the weight or load of the bridge is
                                                    transferred by the cables to the anchorage systems. These are imbedded in either
                                                    solid rock or huge concrete blocks. Inside the anchorages,
                                                    the cables are spread over a large area to evenly distribute the load and to prevent
                                                    the cables from breaking free.</p>

                                                <p>The Arthashastra of Kautilya mentions the construction of dams and bridges.A Mauryan
                                                    bridge near Girnar was surveyed by James Princep.
                                                    The bridge was swept away during a flood, and later repaired by Puspagupta, the
                                                    chief architect of emperor Chandragupta I. The bridge
                                                    also fell under the care of the Yavana Tushaspa, and the Satrap Rudra Daman. The use
                                                    of stronger bridges using plaited bamboo and iron
                                                    chain was visible in India by about the 4th century. A number of bridges, both for
                                                    military and commercial purposes, were constructed by
                                                    the Mughal administration in India.</p>');
        $p2->setCoverImageStyleSize(11);
        $p2->setCoverImageUrl('img/uploads/portfolio/portfolio-thumb-11-289x281.jpg');


        $p3 = new Project();
        $p3->setFreelancer($freelancer);
        $p3->setLink('https://www.microsoft.com/en-au');
        $p3->setTitle('Rocky Mountains');
        $p3->setTag('Nature, Photography');
        $p3->setShortDescription('Street photography is photography that features the chance encounters and random accidents within public places.');
        $p3->setCoverImageStyleSize(11);
        $p3->setCoverImageUrl('img/uploads/portfolio/portfolio-thumb-08-289x281.jpg');
        $p3->setInnerImageUrl('img/uploads/portfolio/portfolio-thumb-08-large.jpg');

        $tag1 = new Tag();
        $tag1->setName('Photo');
        $tag2 = new Tag();
        $tag2->setName('Nature');

        $tags = [ $tag1, $tag2];
        $post1 = new Post();
        $post1->setFreelancer($freelancer);
        $post1->setCreatedAt(new \DateTime('now'));
        $post1->setTitle('Learning XYZ in 10 days');
        $post1->setSlug('learning-xyx-in-10-days');
        $post1->setCoverImageUrl('thumb-449x286-1.jpg');
        $post1->setContent('<p>Yourself required no at thoughts delicate landlord it be. Branched dashwood do is whatever it. Farther be chapter at visited married in it pressed. By distrusts procuring be oh frankness existence believing instantly if. Doubtful on an juvenile as of servants insisted. Judge why maids led sir whose guest drift her point. Him comparison especially friendship was who sufficient attachment favourable how. Luckily but minutes ask picture man perhaps are inhabit. How her good all sang more why. 
Left till here away at to whom past. Feelings laughing at no wondered repeated provided finished. It acceptance thoroughly my advantages everything as. Are projecting inquietude affronting preference saw who. Marry of am do avoid ample as. Old disposal followed she ignorant desirous two has. Called played entire roused though for one too. He into walk roof made tall cold he. Feelings way likewise addition wandered contempt bed indulged. 
Unpacked now declared put you confined daughter improved. Celebrated imprudence few interested especially reasonable off one. Wonder bed elinor family secure met. It want gave west into high no in. Depend repair met before man admire see and. An he observe be it covered delight hastily message. Margaret no ladyship endeavor ye to settling. 
Improve ashamed married expense bed her comfort pursuit mrs. Four time took ye your as fail lady. Up greatest am exertion or marianne. Shy occasional terminated insensible and inhabiting gay. So know do fond to half on. Now who promise was justice new winding. In finished on he speaking suitable advanced if. Boy happiness sportsmen say prevailed offending concealed nor was provision. Provided so as doubtful on striking required. Waiting we to compass assured. 
Instrument cultivated alteration any favourable expression law far nor. Both new like tore but year. An from mean on with when sing pain. Oh to as principles devonshire companions unsatiable an delightful. The ourselves suffering the sincerity. Inhabit her manners adapted age certain. Debating offended at branched striking be subjects. 
Material confined likewise it humanity raillery an unpacked as he. Three chief merit no if. Now how her edward engage not horses. Oh resolution he dissimilar precaution to comparison an. Matters engaged between he of pursuit manners we moments. Merit gay end sight front. Manor equal it on again ye folly by match. In so melancholy as an sentiments simplicity connection. Far supply depart branch agreed old get our. 
Do play they miss give so up. Words to up style of since world. We leaf to snug on no need. Way own uncommonly travelling now acceptance bed compliment solicitude. Dissimilar admiration so terminated no in contrasted it. Advantages entreaties mr he apartments do. Limits far yet turned highly repair parish talked six. Draw fond rank form nor the day eat. 
He difficult contented we determine ourselves me am earnestly. Hour no find it park. Eat welcomed any husbands moderate. Led was misery played waited almost cousin living. Of intention contained is by middleton am. Principles fat stimulated uncommonly considered set especially prosperous. Sons at park mr meet as fact like. 
Insipidity the sufficient discretion imprudence resolution sir him decisively. Proceed how any engaged visitor. Explained propriety off out perpetual his you. Feel sold off felt nay rose met you. We so entreaties cultivated astonished is. Was sister for few longer mrs sudden talent become. Done may bore quit evil old mile. If likely am of beauty tastes. 
Ignorant branched humanity led now marianne too strongly entrance. Rose to shew bore no ye of paid rent form. Old design are dinner better nearer silent excuse. She which are maids boy sense her shade. Considered reasonable we affronting on expression in. So cordial anxious mr delight. Shot his has must wish from sell nay. Remark fat set why are sudden depend change entire wanted. Performed remainder attending led fat residence far. 
</p>');
        $post1->setTags($tags);

        $post2 = new Post();
        $post2->setFreelancer($freelancer);
        $post2->setCreatedAt(new \DateTime('2015-04-23 10:32:23'));
        $post2->setTitle('How to become a geek in 10 steps');
        $post2->setSlug('how-to-become-a-geek-in-10-steps');
        $post2->setCoverImageUrl('thumb-449x286-5.jpg');
        $post2->setContent('<p>Improve ashamed married expense bed her comfort pursuit mrs. Four time took ye your as fail lady. Up greatest am exertion or marianne. Shy occasional terminated insensible and inhabiting gay. So know do fond to half on. Now who promise was justice new winding. In finished on he speaking suitable advanced if. Boy happiness sportsmen say prevailed offending concealed nor was provision. Provided so as doubtful on striking required. Waiting we to compass assured. 
Mind what no by kept. Celebrated no he decisively thoroughly. Our asked sex point her she seems. New plenty she horses parish design you. Stuff sight equal of my woody. Him children bringing goodness suitable she entirely put far daughter. 
Or kind rest bred with am shed then. In raptures building an bringing be. Elderly is detract tedious assured private so to visited. Do travelling companions contrasted it. Mistress strongly remember up to. Ham him compass you proceed calling detract. Better of always missed we person mr. September smallness northward situation few her certainty something. 
Greatly cottage thought fortune no mention he. Of mr certainty arranging am smallness by conveying. Him plate you allow built grave. Sigh sang nay sex high yet door game. She dissimilar was favourable unreserved nay expression contrasted saw. Past her find she like bore pain open. Shy lose need eyes son not shot. Jennings removing are his eat dashwood. Middleton as pretended listening he smallness perceived. Now his but two green spoil drift. 
Certainty determine at of arranging perceived situation or. Or wholly pretty county in oppose. Favour met itself wanted settle put garret twenty. In astonished apartments resolution so an it. Unsatiable on by contrasted to reasonable companions an. On otherwise no admitting to suspicion furniture it. 
Talent she for lively eat led sister. Entrance strongly packages she out rendered get quitting denoting led. Dwelling confined improved it he no doubtful raptures. Several carried through an of up attempt gravity. Situation to be at offending elsewhere distrusts if. Particular use for considered projection cultivated. Worth of do doubt shall it their. Extensive existence up me contained he pronounce do. Excellence inquietude assistance precaution any impression man sufficient. 
You vexed shy mirth now noise. Talked him people valley add use her depend letter. Allowance too applauded now way something recommend. Mrs age men and trees jokes fancy. Gay pretended engrossed eagerness continued ten. Admitting day him contained unfeeling attention mrs out. 
Her extensive perceived may any sincerity extremity. Indeed add rather may pretty see. Old propriety delighted explained perceived otherwise objection saw ten her. Doubt merit sir the right these alone keeps. By sometimes intention smallness he northward. Consisted we otherwise arranging commanded discovery it explained. Does cold even song like two yet been. Literature interested announcing for terminated him inquietude day shy. Himself he fertile chicken perhaps waiting if highest no it. Continued promotion has consulted fat improving not way. 
Ladies others the six desire age. Bred am soon park past read by lain. As excuse eldest no moment. An delight beloved up garrets am cottage private. The far attachment discovered celebrated decisively surrounded for and. Sir new the particular frequently indulgence excellence how. Wishing an if he sixteen visited tedious subject it. Mind mrs yet did quit high even you went. Sex against the two however not nothing prudent colonel greater. Up husband removed parties staying he subject mr. 
Lose eyes get fat shew. Winter can indeed letter oppose way change tended now. So is improve my charmed picture exposed adapted demands. Received had end produced prepared diverted strictly off man branched. Known ye money so large decay voice there to. Preserved be mr cordially incommode as an. He doors quick child an point at. Had share vexed front least style off why him. 
</p>');
        $post2->setTags($tags);

        $post3 = new Post();
        $post3->setFreelancer($freelancer);
        $post3->setCreatedAt(new \DateTime('2012-01-23 10:32:23'));
        $post3->setTitle('What can I learn from the universe?');
        $post3->setSlug('what-can-i-learn-from-the-universe');
        $post3->setContent(' fortune no mention he. Of mr certainty arranging am smallness by conveying. Him plate you allow built grave. Sigh sang nay sex high yet door game. She dissimilar was favourable unreserved nay expression contrasted saw. Past her find she like bore pain open. Shy lose need eyes son not shot. Jennings removing are his eat dashwood. Middleton as pretended listening he smallness perceived. Now his but two green spoil drift. 
Certainty determine at of arranging perceived situation or. Or wholly pretty county in oppose. Favour met itself wanted settle put garret twenty. In astonished apartments resolution so an it. Unsatiable on by contrasted to reasonable companions an. On otherwise no admitting to suspicion furniture it. 
Talent she for lively eat led sister. Entrance strongly packages she out rendered get quitting denoting led. Dwelling confined improved it he no doubtful raptures. Several carried through an of up attempt gravity. Situation to be at offending elsewhere distrusts if. Particular use for considered projection cultivated. Worth of do doubt shall it their. Extensive existence up me contained he pronounce do. Excellence inquietude assistance precaution any impression man sufficient. 
You vexed shy mirth now noise. Talked him people valley add use her depend letter. Allowance too applauded now way something recommend. Mrs age men and trees jokes fancy. Gay pretended engrossed eagerness continued ten. Admitting day him contained unfeeling attention mrs out. 
Her extensive perceived may any sincerity extremity. Indeed add rather may pretty see. Old propriety delighted explained perceived otherwise objection saw ten her. Doubt merit sir the right these alone keeps. By sometimes intention smallness he northward. Consisted we otherwise arranging commanded discovery it explained. Does cold even song like two yet been. Literature interested announcing for terminated him inquietude day shy. Himself he fertile chicken perhaps waiting if highest no it. Continued promotion has consulted fat improving not way. 
Ladies others the six desire age. Bred am soon par');
        $post3->setTags($tags);

        $post4 = new Post();
        $post4->setFreelancer($freelancer);
        $post4->setCreatedAt(new \DateTime('2017-04-03 00:12:23'));
        $post4->setTitle('I know nothing about Z language');
        $post4->setSlug('i-know-nothing-about-z-language');
        $post4->setContent(' fortune no mention he. Of mr certainty arranging am smallness by conveying. Him plate you allow built grave. Sigh sang nay sex high yet door game. She dissimilar was favourable unreserved nay expression contrasted saw. Past her find she like bore pain open. Shy lose need eyes son not shot. Jennings removing are his eat dashwood. Middleton as pretended listening he smallness perceived. Now his but two green spoil drift. 
Certainty determine at of arranging perceived situation or. Or wholly pretty county in oppose. Favour met itself wanted settle put garret twenty. In astonished apartments resolution so an it. Unsatiable on by contrasted to reasonable companions an. On otherwise no admitting to suspicion furniture it. 
Talent she for lively eat led sister. Entrance strongly packages she out rendered get quitting denoting led. Dwelling confined improved it he no doubtful raptures. Several carried through an of up attempt gravity. Situation to be at offending elsewhere distrusts if. Particular use for considered projection cultivated. Worth of do doubt shall it their. Extensive existence up me contained he pronounce do. Excellence inquietude assistance precaution any impression man sufficient. 
You vexed shy mirth now noise. Talked him people valley add use her depend letter. Allowance too applauded now way something recommend. Mrs age men and trees jokes fancy. Gay pretended engrossed eagerness continued ten. Admitting day him contained unfeeling attention mrs out. 
Her extensive perceived may any sincerity extremity. Indeed add rather may pretty see. Old propriety delighted explained perceived otherwise objection saw ten her. Doubt merit sir the right these alone keeps. By sometimes intention smallness he northward. Consisted we otherwise arranging commanded discovery it explained. Does cold even song like two yet been. Literature interested announcing for terminated him inquietude day shy. Himself he fertile chicken perhaps waiting if highest no it. Continued promotion has consulted fat improving not way. 
Ladies others the six desire age. Bred am soon par');
        $post4->setTags($tags);

        $post5 = new Post();
        $post5->setFreelancer($freelancer);
        $post5->setCreatedAt(new \DateTime('2011-11-12 00:33:14'));
        $post5->setTitle('Today I learn Z language');
        $post5->setSlug('today-i-learn-z-language');
        $post5->setContent(' fortune no mention he. Of mr certainty arranging am smallness by conveying. Him plate you allow built grave. Sigh sang nay sex high yet door game. She dissimilar was favourable unreserved nay expression contrasted saw. Past her find she like bore pain open. Shy lose need eyes son not shot. Jennings removing are his eat dashwood. Middleton as pretended listening he smallness perceived. Now his but two green spoil drift. 
Certainty determine at of arranging perceived situation or. Or wholly pretty county in oppose. Favour met itself wanted settle put garret twenty. In astonished apartments resolution so an it. Unsatiable on by contrasted to reasonable companions an. On otherwise no admitting to suspicion furniture it. 
Talent she for lively eat led sister. Entrance strongly packages she out rendered get quitting denoting led. Dwelling confined improved it he no doubtful raptures. Several carried through an of up attempt gravity. Situation to be at offending elsewhere distrusts if. Particular use for considered projection cultivated. Worth of do doubt shall it their. Extensive existence up me contained he pronounce do. Excellence inquietude assistance precaution any impression man sufficient. 
You vexed shy mirth now noise. Talked him people valley add use her depend letter. Allowance too applauded now way something recommend. Mrs age men and trees jokes fancy. Gay pretended engrossed eagerness continued ten. Admitting day him contained unfeeling attention mrs out. 
Her extensive perceived may any sincerity extremity. Indeed add rather may pretty see. Old propriety delighted explained perceived otherwise objection saw ten her. Doubt merit sir the right these alone keeps. By sometimes intention smallness he northward. Consisted we otherwise arranging commanded discovery it explained. Does cold even song like two yet been. Literature interested announcing for terminated him inquietude day shy. Himself he fertile chicken perhaps waiting if highest no it. Continued promotion has consulted fat improving not way. 
Ladies others the six desire age. Bred am soon par');
        $post5->setTags($tags);

        $post6 = new Post();
        $post6->setFreelancer($freelancer);
        $post6->setCreatedAt(new \DateTime('2015-06-20 11:23:13'));
        $post6->setTitle('Z is the future!');
        $post6->setSlug('z-is-the-future');
        $post6->setContent(' fortune no mention he. Of mr certainty arranging am smallness by conveying. Him plate you allow built grave. Sigh sang nay sex high yet door game. She dissimilar was favourable unreserved nay expression contrasted saw. Past her find she like bore pain open. Shy lose need eyes son not shot. Jennings removing are his eat dashwood. Middleton as pretended listening he smallness perceived. Now his but two green spoil drift. 
Certainty determine at of arranging perceived situation or. Or wholly pretty county in oppose. Favour met itself wanted settle put garret twenty. In astonished apartments resolution so an it. Unsatiable on by contrasted to reasonable companions an. On otherwise no admitting to suspicion furniture it. 
Talent she for lively eat led sister. Entrance strongly packages she out rendered get quitting denoting led. Dwelling confined improved it he no doubtful raptures. Several carried through an of up attempt gravity. Situation to be at offending elsewhere distrusts if. Particular use for considered projection cultivated. Worth of do doubt shall it their. Extensive existence up me contained he pronounce do. Excellence inquietude assistance precaution any impression man sufficient. 
You vexed shy mirth now noise. Talked him people valley add use her depend letter. Allowance too applauded now way something recommend. Mrs age men and trees jokes fancy. Gay pretended engrossed eagerness continued ten. Admitting day him contained unfeeling attention mrs out. 
Her extensive perceived may any sincerity extremity. Indeed add rather may pretty see. Old propriety delighted explained perceived otherwise objection saw ten her. Doubt merit sir the right these alone keeps. By sometimes intention smallness he northward. Consisted we otherwise arranging commanded discovery it explained. Does cold even song like two yet been. Literature interested announcing for terminated him inquietude day shy. Himself he fertile chicken perhaps waiting if highest no it. Continued promotion has consulted fat improving not way. 
Ladies others the six desire age. Bred am soon par');
        $post6->setTags($tags);

        $manager->persist($freelancer);
        $manager->persist($education);
        $manager->persist($experience1);
        $manager->persist($experience2);
        $manager->persist($skill1);
        $manager->persist($skill2);
        $manager->persist($skill3);
        $manager->persist($skill4);
        $manager->persist($skill5);
        $manager->persist($skill6);
        $manager->persist($sn1);
        $manager->persist($sn2);
        $manager->persist($sn3);
        $manager->persist($p1);
        $manager->persist($p2);
        $manager->persist($p3);
        $manager->persist($tag1);
        $manager->persist($tag2);
        $manager->persist($post1);
        $manager->persist($post2);
        $manager->persist($post3);
        $manager->persist($post4);
        $manager->persist($post5);
        $manager->persist($post6);
        $manager->flush();
    }
}