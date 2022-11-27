import React, {useState} from 'react';
import { Image } from 'semantic-ui-react';

const Accordion = ({items}) => {
    const [activeIndex, setActiveIndex] =  useState(null);

    const onTitleClick = (index) => {
        setActiveIndex(index);
    }

    const renderedItems = items.map((item,index) => {
        const active = index === activeIndex ? 'active' : '';

        return (
        <React.Fragment key={item.title}>
            <div 
                className={`title ${active}`}
                onClick={() => onTitleClick(index)}
            >
                <i className="dropdown icon"></i>
                {item.title}
            </div>
            <div className={`content ${active}`}>
                <div>
                <Image class="ui avatar image" src={item.photo} floated='left' alt="dev" size='tiny'/>
                <h4>{item.content}</h4>
                </div>
            </div>
        </React.Fragment>
        )
    });

    return <div className="ui styled fluid accordion">
        {renderedItems}
    </div>
};

export default Accordion;