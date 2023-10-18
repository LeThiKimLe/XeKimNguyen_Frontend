import styles from './styles.module.css'
import './featured.css'
import SectionTitle from '../../../../components/common/sectionTitle'
import { useTranslation } from 'react-i18next';
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Feature1 from '../../../../assets/feature1.png';
import Feature2 from '../../../../assets/feature2.png';
import Feature3 from '../../../../assets/feature3.png';

const Featured = () => {
    const {t, i18n} = useTranslation();

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll:1,
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                initialSlide: 3,
                infinite: true,
                dots: true,
                arrows: true
              }
            },
            {
              breakpoint: 1000,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                initialSlide: 2,
                arrows: false
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false
              }
            }
          ]
    }

    return(
        <>
        <div className={styles.featuredContainer}>
            <SectionTitle title={t("feature.title")}
                    subtitle={t("feature.slogan")}></SectionTitle>

            {/* <div className={styles.featured}> */}
            <Slider {...settings}>
                <div className={styles.featuredItem}>
                    <img src={Feature1}
                        alt=""
                        className={styles.futuredImg} />
                    <div className={styles.featuredTitles}>
                        <h1>Ho Chi Minh - Nha Trang</h1>
                        <h2>200.000 VND</h2>
                    </div>
                </div>

                <div className={styles.featuredItem}>
                    <img src={Feature2}
                        alt=""
                        className={styles.futuredImg} />
                    <div className={styles.featuredTitles}>
                        <h1>Da Lat - Ho Chi Minh</h1>
                        <h2>150.000 VND</h2>
                    </div>
                </div>

                <div className={styles.featuredItem}>
                    <img src={Feature3}
                        alt=""
                        className={styles.futuredImg} />
                    <div className={styles.featuredTitles}>
                        <h1>Da Nang - Ho Chi Minh</h1>
                        <h2>400.000 VND</h2>
                    </div>
                </div>

                <div className={styles.featuredItem}>
                    <img src={Feature1}
                        alt=""
                        className={styles.futuredImg} />
                    <div className={styles.featuredTitles}>
                        <h1>Vung Tau - Ho Chi Minh</h1>
                        <h2>100.000 VND</h2>
                    </div>
                </div>
            </Slider>
            {/* </div> */}
        </div>
        </>
    )
}

export default Featured