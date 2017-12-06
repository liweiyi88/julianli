<?php

namespace App\DataFixtures;

use App\Entity\Education;
use App\Entity\Experience;
use App\Entity\Freelancer;
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

        $manager->flush();
    }
}