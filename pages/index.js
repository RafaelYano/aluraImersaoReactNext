import styled from 'styled-components';
import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

import db from '../db.json';
import Widget from '../src/components/Widget/index';
import Footer from '../src/components/Footer/index';
import GitHubCorner from '../src/components/GitHubCorner';
import QuizLogo from '../src/components/QuizLogo';
import QuizBackground from '../src/components/QuizBackground';
import Input from '../src/components/input';
import Button from '../src/components/Button';

/* const Title = styled.h1`
  font-size: 50px;
  color: ${({ theme }) => theme.colors.primary};
` */

/* Trabalhando com react
//function Title(props){ //propriedades/propriedades
//  return <h1>{props.children}</h1>
//} */

/* const BackgroundImage = styled.div`
  background-image: url(${db.bg});
  flex: 1;
  background-size: cover;
  background-position: center;
`; */

//  ` indica uma function

export const QuizContainer = styled.div`
  width: 100%;
  max-width: 350px;
  padding-top: 45px;
  margin: auto 10%;
  @media screen and (max-width: 500px) {
    margin: auto;
    padding: 15px;
  }
`;

export default function Home() {
  const router = useRouter();
  const [name, setName] = React.useState('');

  return (
    <QuizBackground backgroundImage={db.bg}>
      <Head>
        <title>AluraQuiz - RPG de mesa</title>
      </Head>
      <QuizContainer>
        <QuizLogo />
        <Widget as= {motion.section}
          trasnsition = {{delay: 0, duration: 0}}
          variants ={{
            show: {opacity: 1, y:'0'},
            hidden: {opacity: 0, y:'100%'},

          }}
          initial ="hidden"
          animate ="show"
          >
          <Widget.Header>
            Quiz de RPG
          </Widget.Header>
          <Widget.Content>
            <form onSubmit={function (infosDoEvento) {
              infosDoEvento.preventDefault();
              router.push(`/quiz?name=$(name)`);
              console.log('Fazendo uma submissão por meio do react');
              /* router manda para outra página */
            }}
            >
              <Input
                name = "nomeDoUsuario"
                onChange={(infosDoEvento) => setName(infosDoEvento.target.value)}
                placeholder="Seu nome aqui" 
                value={name}
              />
              <Button type="submit" disabled={name.lsength === 0}
                as={motion.button}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                >
                Vamos jogar {name}
              </Button>
            </form>
          </Widget.Content>
        </Widget>
        <Widget as= {motion.section}
          trasnsition = {{delay: 0.5, duration: 0.5}}
          variants ={{
            show: {opacity: 1},
            hidden: {opacity: 0},

          }}
          initial ="hidden"
          animate ="show">
          <Widget.Content>
            <h1>Quizes da Galera</h1>
            <ul>
            {db.external.map((linkExterno) =>{
              const [projectName, githubUser] = linkExterno
                .replace(/\//g, '')
                .replace('https:','')
                .replace('.vercel.app', '')
                .split('.');

              return( 
                <li key={linkExterno}>
                  <Widget.Topic href={linkExterno}>
                    {`${githubUser}/${projectName}`}
                  </Widget.Topic>
                </li>
              );
            })}
            </ul>
          </Widget.Content>
        </Widget>
        <Footer as= {motion.section}
          trasnsition = {{delay: 0.8, duration: 0.8}}
          variants ={{
            show: {opacity: 1, x:'0'},
            hidden: {opacity: 0, x:'100%'},

          }}
          initial ="hidden"
          animate ="show" />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/RafaelYano/aluraImersaoReactNext" />
    </QuizBackground>
  );
}