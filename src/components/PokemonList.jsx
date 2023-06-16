import React, { useEffect, useState } from 'react'
import './pokemon.css'
export default function PokemonList(props) {
    const {name, id, image, abilities, viewDetail, setViewDetail} = props
    const [isSelected, setSelected] = useState(false)

    useEffect(() => {
        setSelected(id === viewDetail?.id)
    }, [viewDetail])

    const closeDetail = () => {
        setViewDetail({
                id: 0,
                isOpen: false
        })
    }
  return (
    <div className=''>
        {isSelected ? (
            <section className='pokemon-list-detailed'>
                <div className='detail-container'>
                    <p className='detail-close' onClick={closeDetail}>X</p>
                    <div className='detail-info'>
                        <img src={image} alt="" />
                        <p className='detail-name'>{name}</p>
                    </div>
                    <div className="detail-skill">
                        <p className="detail-ability">Abilites: </p>
                        {abilities?.map((ab ,index) => {
                            return (<div key={index}>{ab.ability.name}</div>)
                        })}
                    </div>
                </div>
            </section>
        ): ( <section className='pokemon-list-container'>
        <p className='pokemon-name'>{name}</p>
        <img src={image} alt="" />
    </section>)}
       
    </div>
  )
}
