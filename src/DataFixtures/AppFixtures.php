<?php

namespace App\DataFixtures;

use App\Entity\Education;
use App\Entity\Experience;
use App\Entity\Freelancer;
use App\Entity\Project;
use App\Entity\Skill;
use App\Entity\SocialNetwork;
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
        $manager->flush();
    }
}