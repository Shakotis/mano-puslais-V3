"use client";

import React from "react";

const SpaceBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Static Stars */}
      <div className="absolute inset-0 bg-gray-950">
        <div className="stars-tiny animate-twinkle-slower"></div>
        <div className="stars-small animate-twinkle"></div>
        <div className="stars-medium animate-twinkle-slow"></div>
        <div className="stars-large animate-twinkle-slower"></div>
      </div>
      
      {/* Meteors - Only on larger screens */}
      <div className="meteors hidden md:block">
        <div className="meteor meteor-1"></div>
        <div className="meteor meteor-2"></div>
        <div className="meteor meteor-3"></div>
        <div className="meteor meteor-4"></div>
        <div className="meteor meteor-5"></div>
      </div>
      
      <style jsx>{`
        .stars-tiny,
        .stars-small,
        .stars-medium,
        .stars-large {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
        
        .stars-tiny {
          width: 1px;
          height: 1px;
          box-shadow: 
            45px 88px rgba(255,255,255,0.6), 156px 234px rgba(255,255,255,0.4), 267px 123px rgba(255,255,255,0.5),
            378px 67px rgba(255,255,255,0.3), 489px 189px rgba(255,255,255,0.6), 534px 345px rgba(255,255,255,0.4),
            645px 78px rgba(255,255,255,0.5), 756px 234px rgba(255,255,255,0.3), 867px 156px rgba(255,255,255,0.6),
            978px 289px rgba(255,255,255,0.4), 1089px 123px rgba(255,255,255,0.5), 1234px 267px rgba(255,255,255,0.3),
            1345px 89px rgba(255,255,255,0.6), 1456px 178px rgba(255,255,255,0.4), 1567px 234px rgba(255,255,255,0.5),
            1678px 156px rgba(255,255,255,0.3), 1789px 289px rgba(255,255,255,0.6), 1890px 123px rgba(255,255,255,0.4),
            123px 456px rgba(255,255,255,0.5), 234px 567px rgba(255,255,255,0.3), 345px 678px rgba(255,255,255,0.6),
            456px 789px rgba(255,255,255,0.4), 567px 890px rgba(255,255,255,0.5), 678px 234px rgba(255,255,255,0.3),
            789px 345px rgba(255,255,255,0.6), 890px 456px rgba(255,255,255,0.4), 1001px 567px rgba(255,255,255,0.5),
            1112px 678px rgba(255,255,255,0.3), 1223px 789px rgba(255,255,255,0.6), 1334px 890px rgba(255,255,255,0.4),
            1445px 123px rgba(255,255,255,0.5), 1556px 234px rgba(255,255,255,0.3), 1667px 345px rgba(255,255,255,0.6),
            1778px 456px rgba(255,255,255,0.4), 1889px 567px rgba(255,255,255,0.5), 167px 789px rgba(255,255,255,0.3),
            278px 890px rgba(255,255,255,0.6), 389px 123px rgba(255,255,255,0.4), 490px 234px rgba(255,255,255,0.5),
            601px 345px rgba(255,255,255,0.3), 712px 456px rgba(255,255,255,0.6), 823px 567px rgba(255,255,255,0.4);
          animation: sparkle 5s linear infinite;
        }
        
        .stars-small {
          box-shadow: 
            70px 131px #fff, 108px 108px #fff, 140px 93px #fff, 150px 68px #fff, 154px 107px #fff,
            227px 140px #fff, 241px 77px #fff, 318px 117px #fff, 343px 34px #fff, 349px 144px #fff,
            382px 26px #fff, 447px 22px #fff, 473px 45px #fff, 518px 60px #fff, 563px 128px #fff,
            594px 143px #fff, 640px 109px #fff, 688px 154px #fff, 726px 132px #fff, 751px 73px #fff,
            818px 19px #fff, 893px 134px #fff, 925px 96px #fff, 973px 130px #fff, 1002px 134px #fff,
            1036px 42px #fff, 1089px 79px #fff, 1110px 146px #fff, 1132px 78px #fff, 1162px 124px #fff,
            1172px 49px #fff, 1200px 134px #fff, 1227px 108px #fff, 1257px 61px #fff, 1289px 142px #fff,
            1300px 67px #fff, 1352px 105px #fff, 1379px 84px #fff, 1400px 25px #fff, 1450px 118px #fff,
            1480px 142px #fff, 1518px 39px #fff, 1538px 114px #fff, 1578px 133px #fff, 1600px 25px #fff,
            1618px 69px #fff, 1651px 138px #fff, 1700px 73px #fff, 1737px 114px #fff, 1800px 140px #fff,
            25px 200px #fff, 75px 250px #fff, 125px 300px #fff, 175px 350px #fff, 225px 400px #fff,
            275px 450px #fff, 325px 500px #fff, 375px 550px #fff, 425px 600px #fff, 475px 650px #fff,
            525px 700px #fff, 575px 750px #fff, 625px 800px #fff, 675px 850px #fff, 725px 900px #fff,
            775px 950px #fff, 825px 1000px #fff, 875px 1050px #fff, 925px 1100px #fff, 975px 1150px #fff,
            1025px 200px #fff, 1075px 250px #fff, 1125px 300px #fff, 1175px 350px #fff, 1225px 400px #fff,
            1275px 450px #fff, 1325px 500px #fff, 1375px 550px #fff, 1425px 600px #fff, 1475px 650px #fff,
            1525px 700px #fff, 1575px 750px #fff, 1625px 800px #fff, 1675px 850px #fff, 1725px 900px #fff,
            1775px 950px #fff, 1825px 1000px #fff, 1875px 1050px #fff, 1925px 1100px #fff, 1975px 1150px #fff,
            50px 180px #fff, 100px 230px #fff, 150px 280px #fff, 200px 330px #fff, 250px 380px #fff,
            300px 430px #fff, 350px 480px #fff, 400px 530px #fff, 450px 580px #fff, 500px 630px #fff;
          animation: sparkle 3s linear infinite;
        }
        
        .stars-medium {
          width: 2px;
          height: 2px;
          box-shadow: 
            213px 15px #fff, 323px 67px #fff, 381px 89px #fff, 450px 13px #fff, 564px 90px #fff,
            650px 33px #fff, 773px 44px #fff, 834px 144px #fff, 907px 135px #fff, 968px 61px #fff,
            1062px 105px #fff, 1153px 130px #fff, 1223px 32px #fff, 1325px 104px #fff, 1413px 72px #fff,
            1490px 123px #fff, 1579px 85px #fff, 1633px 146px #fff, 1699px 98px #fff, 1760px 54px #fff,
            120px 200px #fff, 320px 250px #fff, 520px 300px #fff, 720px 350px #fff, 920px 400px #fff,
            1120px 450px #fff, 1320px 500px #fff, 1520px 550px #fff, 1720px 600px #fff, 1920px 650px #fff,
            180px 700px #fff, 380px 750px #fff, 580px 800px #fff, 780px 850px #fff, 980px 900px #fff,
            1180px 950px #fff, 1380px 1000px #fff, 1580px 1050px #fff, 1780px 1100px #fff, 1980px 1150px #fff,
            60px 160px #fff, 260px 210px #fff, 460px 260px #fff, 660px 310px #fff, 860px 360px #fff,
            1060px 410px #fff, 1260px 460px #fff, 1460px 510px #fff, 1660px 560px #fff, 1860px 610px #fff;
          animation: sparkle 2s linear infinite;
        }
        
        .stars-large {
          width: 2px;
          height: 2px;
          box-shadow: 
            90px 40px #fff, 230px 80px #fff, 360px 30px #fff, 500px 70px #fff, 680px 80px #fff,
            800px 60px #fff, 950px 50px #fff, 1100px 40px #fff, 1250px 85px #fff, 1400px 75px #fff,
            1550px 45px #fff, 1700px 95px #fff, 1850px 35px #fff, 150px 200px #fff, 350px 240px #fff,
            550px 280px #fff, 750px 320px #fff, 950px 360px #fff, 1150px 400px #fff, 1350px 440px #fff,
            1550px 480px #fff, 1750px 520px #fff, 1950px 560px #fff, 80px 600px #fff, 280px 640px #fff,
            480px 680px #fff, 680px 720px #fff, 880px 760px #fff, 1080px 800px #fff, 1280px 840px #fff,
            1480px 880px #fff, 1680px 920px #fff, 1880px 960px #fff, 120px 1000px #fff, 320px 1040px #fff,
            520px 1080px #fff, 720px 1120px #fff, 920px 1160px #fff, 1120px 1200px #fff, 1320px 180px #fff,
            1520px 220px #fff, 1720px 260px #fff, 1920px 300px #fff, 60px 340px #fff, 260px 380px #fff,
            460px 420px #fff, 660px 460px #fff, 860px 500px #fff, 1060px 540px #fff, 1260px 580px #fff;
          animation: sparkle 4s linear infinite;
        }
        
        @keyframes sparkle {
          0%, 100% { opacity: 0.4; }
          25% { opacity: 0.8; }
          50% { opacity: 0.2; }
          75% { opacity: 0.9; }
        }
        
        .meteors {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }
        
        .meteor {
          position: absolute;
          width: 2px;
          height: 2px;
          background: linear-gradient(-45deg, #fff, transparent);
          border-radius: 50%;
        }
        
        .meteor::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 300px;
          height: 1px;
          background: linear-gradient(to right, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0));
          transform: translateX(-100%);
        }
        
        .meteor-1 {
          top: 80px;
          animation: meteor 15s linear infinite;
          animation-delay: 0s;
        }
        
        .meteor-2 {
          top: 30px;
          animation: meteor 12s linear infinite;
          animation-delay: 4s;
        }
        
        .meteor-3 {
          top: 50px;
          animation: meteor 18s linear infinite;
          animation-delay: 8s;
        }
        
        .meteor-4 {
          top: 120px;
          animation: meteor 20s linear infinite;
          animation-delay: 2s;
        }
        
        .meteor-5 {
          top: 90px;
          animation: meteor 16s linear infinite;
          animation-delay: 6s;
        }
        
        @keyframes meteor {
          0% {
            left: -300px;
            opacity: 0;
            transform: rotate(0deg);
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            left: 100vw;
            opacity: 0;
            transform: rotate(0deg);
          }
        }
      `}</style>
    </div>
  );
};

export default SpaceBackground;