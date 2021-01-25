import styled from 'styled-components'
import db from '../pages/db.json'
import Widget from '../src/components/Widget/index'
import Footer from '../src/components/Footer/index'
import GitHubCorner from '../src/components/GitHubCorner'
import QuizBackground from '../src/components/QuizBackground'


/*const Title = styled.h1`
  font-size: 50px;
  color: ${({ theme }) => theme.colors.primary};
`*/

//Trabalhando com react
//function Title(props){ //propriedades/propriedades
//  return <h1>{props.children}</h1>
//}


/*const BackgroundImage = styled.div` 
  background-image: url(${db.bg});
  flex: 1;
  background-size: cover;
  background-position: center;
`;*/

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
  return( 
  <QuizBackground backgroundImage={db.bg}>
    <QuizContainer>
        <Widget> 
          <Widget.Header>
            Quiz de RPG
          </Widget.Header>
          <Widget.Content>
              <p> Outro texto aleatório </p>
            </Widget.Content>
        </Widget>
        <Widget>
          <Widget.Content>
            <h1>RPG de mesa</h1>
            <p>Um texto aleátorio e interessante</p>
          </Widget.Content>
        </Widget>
      
      <Footer />
    </QuizContainer>
    <GitHubCorner projectUrl="https://github.com/RafaelYano"/>
  </QuizBackground>
  );
}
