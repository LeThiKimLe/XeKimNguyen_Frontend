import './propertyList.css'
import SectionTitle from '../sectionTitle/SectionTitle'
import { useTranslation } from 'react-i18next';

const PropertyList = () =>
{
    const {t, i18n} = useTranslation();
    return (
        <>
        <div className="pListContainer">
        <SectionTitle title={t("property.title")}
                    subtitle={t("property.slogan")}></SectionTitle>
            <div className="pListCover">
                <div className='pList'>
                    <div className="pListItem">
                        <img src="./props1.svg" alt="" className='pListImg'/>
                        <div className="pListTitle">
                            <span className='property'>{t("property.list_props.0.property")}</span>
                            <span className='property_field'>{t("property.list_props.0.property_field")}</span>
                            <h3 className='property_desc'>{t("property.list_props.0.property_desc")}</h3>
                        </div>
                    </div>
                    <div className="pListItem">
                        <img src="./props2.svg" alt="" className='pListImg'/>
                        <div className="pListTitle">
                            <span className='property'>{t("property.list_props.1.property")}</span>
                            <span className='property_field'>{t("property.list_props.1.property_field")}</span>
                            <h3 className='property_desc'>{t("property.list_props.1.property_desc")}</h3>
                        </div>
                    </div>
                    <div className="pListItem">
                        <img src="./props3.svg" alt="" className='pListImg'/>
                        <div className="pListTitle">
                            <span className='property'>{t("property.list_props.2.property")}</span>
                            <span className='property_field'>{t("property.list_props.2.property_field")}</span>
                            <h3 className='property_desc'>{t("property.list_props.2.property_desc")}</h3>
                        </div>
                    </div>
                </div>
                <div className="pListMainImg">
                    <img src="pic.svg" alt="" />
                </div>
            </div>
        </div>
        </>
    )
}

export default PropertyList