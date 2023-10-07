import './sectionTitle.css'

const SectionTitle = ({title, subtitle}) => {
    return(
        <div className="sectionTitle">
                <h1>{title}</h1>
                <h2>{subtitle}</h2>
        </div>
    )
}

export default SectionTitle