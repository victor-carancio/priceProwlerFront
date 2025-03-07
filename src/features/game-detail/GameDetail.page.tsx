import { useParams } from "react-router-dom";
import { useGetGameDetailQuery } from "../../store/apis/gameApi";
import { FaLink } from "react-icons/fa";
import { GameDetails, Screenshot } from "../../@types/global";
import GameImagesGallery from "./components/imageGallery/GameImagesGallery";
import { getImgGame, Months } from "../../utils";
import { useRef, useState } from "react";
import { StyledIcon } from "../../shared/components/logo/logo";
import { ViewMore } from "../../shared/styles/styled-components/viewMore/ViewMoreButton";
import Loading from "../../shared/components/loading/Loading";
import { Helmet } from "react-helmet-async";
import SearchError from "../../shared/components/search-error/SearchError";
import StorePrice from "../../shared/components/store-price/store-price/StorePrice";
import {
  AboutGame,
  ContainerGame,
  CoverGame,
  GalleryMobile,
  GalleryTablet,
  GameDescription,
  HeaderGame,
  InfoContainer,
  InfoOfGame,
  MainInfo,
  Overview,
  PricesDetail,
  StoreContainer,
  WebSiteContainer,
} from "./GameDetail.styles";

const GameDetail = () => {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [maxHeight, setMaxHeight] = useState(0);
  const contentRef = useRef<HTMLParagraphElement>(null);
  const { id } = useParams();

  const toggleExpand = () => {
    if (contentRef.current) {
      setMaxHeight(contentRef.current.scrollHeight);
    }

    setIsDescriptionExpanded(!isDescriptionExpanded);
  };

  const { data, error, isLoading } = useGetGameDetailQuery(id!);

  if (isLoading) return <Loading />;
  if (error || !data) return <SearchError />;

  const game = { ...getStoreInfo(data) };
  return (
    <>
      <Helmet>
        <title>{game.gameName} | Detalle | Price Prowler</title>
        <meta
          name="description"
          content={`Consulta y compara los precios actuales para ${game.gameName}.`}
        />
      </Helmet>
      <ContainerGame $imageUrl={data.stores[0].info_game.screenshots[0].url}>
        <h2>{game.gameName}</h2>

        <HeaderGame $imageUrl={getImgGame(data)}>
          <MainInfo>
            <CoverGame src={getImgGame(data)} alt={`${data.gameName}-img`} />
            <GalleryTablet aria-label="tablet-gallery">
              <GameImagesGallery images={getImagesFromGame(game.screenshots)} />
            </GalleryTablet>
          </MainInfo>
          <PricesDetail>
            <h3>Tiendas disponibles:</h3>
            {data.stores.map((store) => {
              return (
                <StoreContainer
                  key={store.id}
                  aria-label={`${store.store}-price`}
                >
                  <StorePrice
                    store={store}
                    shouldRedirect={true}
                    // detail={true}
                  />
                </StoreContainer>
              );
            })}
          </PricesDetail>
        </HeaderGame>
        <GalleryMobile aria-label="mobile-gallery">
          <GameImagesGallery images={getImagesFromGame(game.screenshots)} />
        </GalleryMobile>
        <></>

        <AboutGame>
          <Overview>
            <div>
              <h3>ACERCA DE ESTE JUEGO</h3>
              <hr />
            </div>

            <p>{game.about}</p>
            {game.description && (
              <>
                <GameDescription
                  $isExpanded={isDescriptionExpanded}
                  $maxHeight={maxHeight}
                  ref={contentRef}
                >
                  <h4>Descripción</h4>
                  <hr />
                  <br />
                  <p>
                    {game.description.split("\n").map((line, index) => {
                      return (
                        <span key={index}>
                          {line}
                          {index !==
                            game.description.split("\n").length - 1 && (
                            <>
                              <br />
                            </>
                          )}
                        </span>
                      );
                    })}
                  </p>
                </GameDescription>
                {/* <ViewMoreButton isExpanded={isDescriptionExpanded } onClick={toggleExpand}/> */}
                <ViewMore onClick={toggleExpand}>
                  {isDescriptionExpanded ? "Ver menos" : "Ver más"}
                </ViewMore>
              </>
            )}

            {game.pc_requirements?.minimum &&
              game.pc_requirements.recommended && (
                <div>
                  <h4>Requisitos del sistema</h4>
                  <hr />
                  <br />
                  <p>
                    {" "}
                    {game.pc_requirements.minimum
                      .split("\n")
                      .map((line, index) => {
                        return (
                          <span key={index}>
                            {index === 0 ? (
                              <strong>{line.toUpperCase()}</strong>
                            ) : (
                              <>{` • ${line}`}</>
                            )}
                            {index !==
                              game.pc_requirements!.minimum.split("\n").length -
                                1 && (
                              <>
                                <br />
                                <br />
                              </>
                            )}
                          </span>
                        );
                      })}
                  </p>

                  <br />
                  <p>
                    {" "}
                    {game.pc_requirements.recommended
                      .split("\n")
                      .map((line, index) => {
                        return (
                          <span key={index}>
                            {index === 0 ? (
                              <strong>{line.toUpperCase()}</strong>
                            ) : (
                              <>{` • ${line}`}</>
                            )}
                            {index !==
                              game.pc_requirements!.recommended.split("\n")
                                .length -
                                1 && (
                              <>
                                <br />
                                <br />
                              </>
                            )}
                          </span>
                        );
                      })}
                  </p>
                </div>
              )}
          </Overview>
          <InfoOfGame>
            <div>
              <h4>Información del juego</h4>
              <hr />
            </div>

            {game.ratings && (
              <InfoContainer>
                <p>{game.ratings.name}</p>
                <span>
                  {" "}
                  <strong>{`${game.ratings.rating.toUpperCase()}
              `}</strong>{" "}
                  - {game.ratings.descriptors}
                </span>
              </InfoContainer>
            )}

            {game.developer && (
              <InfoContainer>
                <p>Desarrollador</p>
                <span>{game.developer}</span>
              </InfoContainer>
            )}

            {game.publisher && (
              <InfoContainer>
                <div>
                  <p>Editor</p>
                </div>
                <span>{game.publisher}</span>
              </InfoContainer>
            )}

            {game.genres && (
              <InfoContainer>
                <p>Género</p>
                <span>{getInfoOfGameNames(game.genres)}</span>
              </InfoContainer>
            )}

            {game.release_date && (
              <InfoContainer>
                <p>Lanzamiento</p>
                <span>{getCorrectDate(game.store, game.release_date)}</span>
              </InfoContainer>
            )}

            {game.supportedLanguages !== "-" && (
              <InfoContainer>
                <p>Lenguajes</p>
                <span>{game.supportedLanguages}</span>
              </InfoContainer>
            )}

            {game.categories && (
              <InfoContainer>
                <div>
                  <p>Categorías</p>
                </div>
                <span>{getInfoOfGameNames(game.categories)}</span>
              </InfoContainer>
            )}

            {game.website !== "-" && (
              <WebSiteContainer>
                <a
                  href={game.website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Sitio web
                </a>
                <StyledIcon>
                  <FaLink size="14px" />
                </StyledIcon>
              </WebSiteContainer>
            )}
          </InfoOfGame>
        </AboutGame>
      </ContainerGame>
    </>
  );
};

const getImagesFromGame = (screenshots: Screenshot[]) => {
  return screenshots.map((image) => {
    return {
      original: image.url,
      thumbnail: image.thumbUrl === "-" ? image.url : image.thumbUrl,
      fullscreen: image.url,
    };
  });
};

const getStoreInfo = (game: GameDetails) => {
  const { gameName, id: gameId, stores } = game;

  const steam = stores.find((store) => store.store === "Steam");
  const xbox = stores.find((store) => store.store === "Xbox");
  const epic = stores.find((store) => store.store === "Epic");

  const existStore = steam ?? xbox ?? epic!;

  const {
    gamepass,
    id: storeId,
    info_game,
    info_price,
    store,
    url,
  } = existStore;

  const {
    about,
    categories,
    description,
    developer,
    genres,
    id: infoGameId,
    imgStore,
    publisher,
    release_date,
    screenshots,
    videos,
    website,
    pc_requirements,
    supportedLanguages,
    ratings,
  } = info_game;

  return {
    gameName,
    gameId,

    gamepass,
    storeId,
    info_price,
    store,
    url,
    about,
    categories,
    description,
    developer,
    genres,
    infoGameId,
    imgStore,
    publisher,
    release_date,
    screenshots,
    videos,
    website,
    pc_requirements,
    supportedLanguages,
    ratings: ratings ? ratings[0] : null,
  };
};

const getInfoOfGameNames = (info: string[]) => {
  return info
    .map((name) => name)
    .slice(0, 10)
    .join(" - ");
};

const transformDate = (dateString: string) => {
  // Diccionario para convertir meses en español a números
  const months = {
    ENE: "01",
    FEB: "02",
    MAR: "03",
    ABR: "04",
    MAY: "05",
    JUN: "06",
    JUL: "07",
    AGO: "08",
    SEP: "09",
    OCT: "10",
    NOV: "11",
    DIC: "12",
  };

  // Separar los componentes de la fecha
  const [day, month, year] = dateString.split(" ");

  // Formatear la fecha como YYYY-MM-DDT00:00:00.000Z
  const formattedDate = `${year}-${
    months[month as keyof typeof months]
  }-${day.padStart(2, "0")}`;

  return formattedDate;
};

const getCorrectDate = (store: string, release_date: string) => {
  const correctReleaseDate =
    store !== "Steam" ? release_date : transformDate(release_date);

  const date = new Date(correctReleaseDate);

  return `${date.getDay()} de ${
    Months[date.getMonth()]
  } de ${date.getFullYear()}`;
};

export default GameDetail;
