import { useInfiniteQuery, useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "../api";
import { Helmet } from "react-helmet";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${props => props.theme.boxColor};
  @font-face {
    font-family: "EarlyFontDiary";
    src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_220508@1.0/EarlyFontDiary.woff2")
      format("woff2");
    font-weight: normal;
    font-style: normal;
  }
  font-family: "EarlyFontDiary";
  font-size: 2rem;
  font-weight: 600;

  &:hover {
    -webkit-transition: -webkit-transform 0.35s;
    transition: transform 0.35s;
    -webkit-transform: translate3d(0, -10px, 0);
    transform: translate3d(0, -10px, 0);
  }
`;

const Loader = styled.span`
  text-align: center;
  display: block;
  color: ${props => props.theme.boxColor};
`;

interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

const CoinsList = styled.ul``;

const Coin = styled.li`
  background-color: ${props => props.theme.boxColor};
  color: ${props => props.theme.textColor};
  border-radius: 15px;
  margin-bottom: 10px;
  @font-face {
    font-family: "SuncheonB";
    src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2202-2@1.0/SuncheonB.woff")
      format("woff");
    font-weight: normal;
    font-style: normal;
  }
  font-family: "SuncheonB";

  a {
    padding: 20px;
    transition: color 0.2s ease-in;
    display: flex;
    align-items: center;
  }
  &:hover {
    a {
      color: ${props => props.theme.accentColor};
    }
  }
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${props => props.theme.accentColor};
`;

const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;

function Coins() {
  const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins);
  const [Infinite, setInfinite] = useState(10);

  const { ref, inView } = useInView();

  // 무한 스크롤

  useEffect(() => {
    if (inView && !isLoading) {
      setInfinite(prev => prev + 10);
    }
  }, [inView, isLoading]);

  return (
    <Container>
      <Helmet>
        <title>코인</title>
      </Helmet>
      <Header>Bida Coin</Header>

      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <CoinsList>
          {data?.slice(0, Infinite).map(coin => (
            <Coin key={coin.id}>
              <Link
                to={{
                  pathname: `/${coin.id}`,
                  state: { name: coin.name },
                }}
              >
                <Img
                  src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                />
                {coin.name} &rarr;
              </Link>
            </Coin>
          ))}
          <div ref={ref}></div>
        </CoinsList>
      )}
    </Container>
  );
}
export default Coins;
