import React from 'react';
import CountUp from 'react-countup';


import { Container } from './styles';

import arrowDownImg from '../../assets/arrow-down.svg';
import arrowUpImg from '../../assets/arrow-up.svg';
import dollarImg from '../../assets/dollar.svg';

interface IWalletCardProps {
    title: string;
    amount: number;
    color: string;
    footer: string;
    icon: 'dollar' | 'arrowUp' | 'arrowDown';
}



const WalletCard: React.FC<IWalletCardProps> = ({title, amount, color, footer, icon}) => {

    const iconList = {
        dollar: dollarImg,
        arrowUp: arrowUpImg,
        arrowDown: arrowDownImg
    }
    
    return (
        <Container color={color}>
            <span>{title}</span>
            <h1>
                <CountUp 
                    end={amount}
                    duration={1}
                    separator='.'
                    decimal=',' 
                    decimals={2} 
                    prefix='R$ '

                
                />

            </h1>
            <small>{footer}</small>
            <img src={iconList[icon]} alt={title}></img>
        </Container>
    );
}

export default WalletCard;