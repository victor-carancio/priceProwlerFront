import { useParams } from "react-router-dom";
import { useGetGameDetailQuery } from "../store/apis/gameApi";
import styled from "styled-components";
import { getImgGame } from "./Results";
import {
  GameDetails,
  ImgSizes,
  InvolvedCompany,
  NameIdClass,
  StoreTypes,
} from "../@types/global.d";
import { device, deviceMax } from "../styles/media";
import StorePrice from "../components/storePrice/StorePrice";
import GameImagesGallery from "../components/imageGallery/GameImagesGallery";
import { Months } from "../utils";

const GameDetail = () => {
  const { id } = useParams();

  const { data, error, isLoading } = useGetGameDetailQuery(id!);

  //todo: loading y error de busqueda
  if (isLoading) return <div>Cargando games....</div>;
  if (error || !data) return <div>Ocurrió un error al cargar los datos</div>;

  const companyLogos = {
    ...getCompaniesInfo(data.infoGame[0].involved_companies),
  };

  return (
    <ContainerGame $imageUrl={getImgGame(data, ImgSizes.HD_720_p_2X)}>
      <h2>{data.gameName}</h2>

      <HeaderGame>
        <MainInfo>
          <CoverGame
            src={getImgGame(data, ImgSizes.COVER_BIG_2X)}
            alt={`${data.gameName}-img`}
          />
          <GalleryTablet>
            <GameImagesGallery images={getImagesFromGame(data)} />
          </GalleryTablet>
        </MainInfo>
        <PricesDetail>
          <h3>Tiendas disponibles:</h3>
          {data.stores.map((store) => {
            return (
              <StoreContainer key={store.id}>
                <StorePrice store={store} shouldRedirect={true} detail={true} />
              </StoreContainer>
            );
          })}
        </PricesDetail>
      </HeaderGame>
      <GalleryMobile className="">
        <GameImagesGallery images={getImagesFromGame(data)} />
      </GalleryMobile>
      <></>

      <AboutGame>
        <Overview>
          <div>
            <h3>ACERCA DE ESTE JUEGO</h3>
            <hr />
          </div>

          <p>{data.infoGame[0].summary}</p>
          {data.infoGame[0].storyline && (
            <>
              {" "}
              <h4>Trama</h4>
              <hr />
              <p>{data.infoGame[0].storyline}</p>
            </>
          )}
        </Overview>
        <InfoOfGame>
          <div>
            <h4>Información del juego</h4>
            <hr />
          </div>

          <InfoContainer>
            <p>Clasificación por edad</p>
            <span>16</span>
          </InfoContainer>

          {companyLogos.developer && (
            <InfoContainer>
              <p>Desarrollador</p>
              <span>{companyLogos.developer}</span>
            </InfoContainer>
          )}

          {companyLogos.publisher && (
            <InfoContainer>
              <div>
                <p>Editor</p>
              </div>

              <span>{companyLogos.publisher}</span>
            </InfoContainer>
          )}

          {companyLogos.porting && (
            <InfoContainer>
              <p>Encargado del port</p>
              <span>{companyLogos.porting}</span>
            </InfoContainer>
          )}

          {companyLogos.supporting && (
            <InfoContainer>
              <p>Desarrollador de soporte</p>
              <span>{companyLogos.supporting}</span>
            </InfoContainer>
          )}

          <InfoContainer>
            <p>Género</p>
            <span>{getInfoOfGameNames(data.infoGame[0].genres)}</span>
          </InfoContainer>

          <InfoContainer>
            <p>Lanzamiento</p>
            <span>
              {unixTimeStampToDate(data.infoGame[0].first_release_date)}
            </span>
          </InfoContainer>

          <InfoContainer>
            <p>Motor</p>
            {getInfoOfGameNames(data.infoGame[0].game_engines)}
          </InfoContainer>
          <InfoContainer>
            <div>
              <p>Keywords</p>
            </div>

            <span>{getInfoOfGameNames(data.infoGame[0].keywords)}</span>
          </InfoContainer>
        </InfoOfGame>
      </AboutGame>
    </ContainerGame>
  );
};

interface ContainerGameProps {
  $imageUrl: string;
}

const ContainerGame = styled.div<ContainerGameProps>`
  margin: 0 auto;
  max-width: 1440px;
  padding: 40px 10px;
  width: 100%;
  background-image: ${({ theme, $imageUrl }) =>
    `radial-gradient(${theme.bodyBackgroundGradient}), url(${$imageUrl}) `};
  background-repeat: no-repeat;
  background-position: top center;
  background-size: cover;

  @media ${device.tablet} {
    padding: 60px 15px;
  }

  @media ${device.laptop} {
    padding: 60px 90px;
  }

  @media ${device.desktop} {
    padding: 60px 125px;
  }
`;

const HeaderGame = styled.div`
  margin: 20px 0;
  padding: 20px 15px;
  width: 100%;
  display: flex;
  flex-flow: column;
  gap: 10px;
  background-color: ${({ theme }) => theme.cardGameOpaque};

  border-radius: 5px;
  @media ${device.tablet} {
    padding: 20px 10px;
    flex-flow: row;

    justify-content: center;
    align-items: center;
    height: 500px;
    gap: 15px;
  }
`;

const MainInfo = styled.div`
  width: 100%;
  @media ${device.tablet} {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 60%;
  }

  @media ${device.laptop} {
    width: 60%;
  }
`;

const CoverGame = styled.img`
  width: 100%;
  height: 450px;
  object-fit: contain;
  border-radius: 5px;
  filter: drop-shadow(0 0 8px rgba(0, 0, 0, 0.8));

  @media ${device.tablet} {
    display: none;
  }
`;

const PricesDetail = styled.div`
  height: auto;
  width: 100%;
  max-width: 340px;
  margin: 60px auto;
  display: flex;
  flex-direction: column;
  gap: 10px;

  @media ${device.tablet} {
    width: 40%;
    margin: 0;
    max-width: 450px;
  }

  @media ${device.laptop} {
    width: 30%;
    margin: 0;
    max-width: 450px;
  }
`;

const StoreContainer = styled.div`
  max-width: 500px;
  width: 100%;
  padding: 7px 0;
`;

const GalleryMobile = styled.div`
  margin: 0px auto;
  margin-bottom: 20px;
  filter: drop-shadow(0 0 8px rgba(0, 0, 0, 0.4));
  width: 80%;
  @media ${device.tablet} {
    display: none;
  }
`;

const GalleryTablet = styled.div`
  filter: drop-shadow(0 0 8px rgba(0, 0, 0, 0.4));
  margin: 0 auto;
  width: 100%;
  max-width: 600px;
  @media ${deviceMax.tablet} {
    display: none;
  }
`;

const AboutGame = styled.div`
  display: flex;
  flex-flow: column nowrap;
  padding: 20px 10px;
  gap: 20px;
  @media ${device.laptop} {
    padding: 20px 0;
    width: 100%;
    flex-flow: row nowrap;
    justify-content: space-between;
  }
  h4 {
    font-size: 18px;
  }
  p,
  span {
    font-size: 15px;
    color: ${({ theme }) => theme.textBody};
  }
`;

const Overview = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  @media ${device.laptop} {
    width: 65%;
  }
`;

const InfoOfGame = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 12px;
  @media ${device.laptop} {
    width: 30%;
  }
`;

const InfoContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  gap: 10px;
  & div:first-child {
    width: 102px;
  }
  p {
    font-weight: bold;
    width: 102px;
  }
  span {
    width: 68%;
    overflow: hidden;
  }
`;

const getImagesFromGame = (game: GameDetails) => {
  const { infoGame, stores } = game;

  const storeImage: Record<StoreTypes, string> = {
    [StoreTypes.STEAM_STORE]: "",
    [StoreTypes.EPIC_STORE]: "?h=352&amp;quality=medium&amp;resize=1&amp;w=264",
    [StoreTypes.XBOX_STORE]: "?q=100&h=352&w=265",
  };
  if (!infoGame || infoGame.length <= 0) {
    return stores.map((store) => {
      return {
        original: store.imgStore,
        thumbnail: `${store.imgStore}${storeImage[store.store as StoreTypes]}`,
        fullscreen: store.imgStore,
      };
    });
  }

  const artworks = infoGame[0].artworks.map((artwork) => {
    return {
      original: `https://images.igdb.com/igdb/image/upload/t_${ImgSizes.HD_720_p}/${artwork.image_id}.jpg`,
      thumbnail: `https://images.igdb.com/igdb/image/upload/t_${ImgSizes.LOGO_MED}/${artwork.image_id}.jpg`,
      fullscreen: `https://images.igdb.com/igdb/image/upload/t_${ImgSizes.HD_720_p_2X}/${artwork.image_id}.jpg`,
    };
  });

  const videos = infoGame[0].videos.map((video) => {
    return {
      original: `https://www.youtube.com/embed/${video.video_id}`,
      thumbnail: `https://img.youtube.com/vi/${video.video_id}/0.jpg`,
      fullscreen: `https://www.youtube.com/embed/${video.video_id}`,
    };
  });

  return [...artworks, ...videos];
};

const getCompaniesInfo = (involvedCompanies: InvolvedCompany[]) => {
  const developer = involvedCompanies
    .filter((company) => company.developer)
    .map((company) => company.company.name);
  const publisher = involvedCompanies
    .filter((company) => company.publisher)
    .map((company) => company.company.name);
  const porting = involvedCompanies
    .filter((company) => company.porting)
    .map((company) => company.company.name);

  const supporting = involvedCompanies
    .filter((company) => company.supporting)
    .map((company) => company.company.name);

  return {
    developer: developer.length > 0 ? developer.join(" - ") : null,
    publisher: publisher.length > 0 ? publisher.join(" - ") : null,
    porting: porting.length > 0 ? porting.join(" - ") : null,
    supporting: supporting.length > 0 ? supporting.join(" - ") : null,
  };
};

const getInfoOfGameNames = (info: NameIdClass[]) => {
  return info
    .map(({ name }) => name)
    .slice(0, 10)
    .join(" - ");
};

const unixTimeStampToDate = (unix: string) => {
  const unixTimeStamp = parseInt(unix, 10);
  const date = new Date(unixTimeStamp * 1000);

  return `${date.getDay()} de ${
    Months[date.getMonth()]
  } de ${date.getFullYear()}`;
};

export default GameDetail;
