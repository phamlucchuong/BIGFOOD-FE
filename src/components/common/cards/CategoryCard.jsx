import styles from "./CategoryCard.module.css"; 

export default function CategoryCard({name, image, title, onclick}) {
    return ( 
        <div className={styles.card} onClick={onclick}> 
            <img src={image} alt={name} className={styles.image} /> 
            <div className={styles.overlay}>
                <span className={styles.title}>{title}</span> 
            </div>
        </div> 
    ); 
}