import React, { useState, useMemo, useCallback } from 'react';
import { Container, Content } from './styles';


import WalletCard from '../../components/WalletCard';
import ContentHeader from '../../components/ContentHeader';
import SelectInput from '../../components/SelectInput';
import MessageBox from '../../components/MessageBox';
import PieChartBox from '../../components/PieChart';
import HistoryBox from '../../components/HistoryBox';
import BarChartBox from '../../components/BarChartBox';

import gains from '../../repositories/gains';
import expenses from '../../repositories/expenses';
import listOfMonths from '../../repositories/months';
import happyImg from '../../assets/happy.svg';
import sadImg from '../../assets/sad.svg';
import grinningImg from '../../assets/grinning.svg';

const Dashboard: React.FC = () => {

    const [monthSelected, setMonthSelected] = useState<number>(new Date().getMonth() + 1);
    const [yearSelected, setYearSelected] = useState<number>(new Date().getFullYear());

    const months = useMemo(() => { 
        return listOfMonths.map((month, index) => {
            return {
                value: index + 1,
                label: month
            }
        });
    },[]);


    const years = useMemo(() => { 
        let uniqueYears: number[] = [];


        [...gains, ...expenses].forEach(item => {
            
            const date = new Date(item.date);
            const year = date.getFullYear();

            if (!uniqueYears.includes(year)){
                uniqueYears.push(year);
            }

        });

        return uniqueYears.map(year => {
            return {
                value: year,
                label: year
            }
        });
    },[]);





    const totalGains = useMemo(() => {
        let total: number = 0;

        gains.forEach(item => {
            const date = new Date(item.date);
            const year = date.getFullYear();
            const month = date.getMonth() + 1;

            if(month === monthSelected && year === yearSelected){
                try{
                    total += Number(item.amount)
                }catch{
                    throw new Error('Invalid amount! Amount must be number.')
                }
            }
        });
        return total;
    },[monthSelected, yearSelected]);

    
    const totalExpenses = useMemo(() => {
        let total: number = 0;

        expenses.forEach(item => {
            const date = new Date(item.date);
            const year = date.getFullYear();
            const month = date.getMonth() + 1;

            if(month === monthSelected && year === yearSelected){
                try{
                    total += Number(item.amount)
                }catch{
                    throw new Error('Invalid amount! Amount must be number.')
                }
            }
        });

        return total;
    },[monthSelected, yearSelected]);


    const totalBalance = useMemo(() => {

        return totalGains - totalExpenses;
        
    },[totalExpenses, totalGains]);

    const relationExpensesVersusGains = useMemo(() => {
        const total = totalGains + totalExpenses;

        const percentGains = Number(((totalGains / total) * 100).toFixed(1));
        const percentExpenses = Number(((totalExpenses / total) * 100).toFixed(1));

        const data = [
            {
                name: "Entradas",
                value: totalGains,
                percent: percentGains ? percentGains : 0, 
                color: '#0088d1'
            },
            {
                name: "Saídas",
                value: totalExpenses,
                percent: percentExpenses ? percentExpenses : 0, 
                color: '#ed7c02'
            },
        ];

        return data;
    },[totalGains, totalExpenses]);

    const message = useMemo(() => {
        if (totalBalance < 0) {
            return {
                title: "Que triste!",
                description: "Você está negativo...",
                footerText: "Procure um agiota",
                icon: sadImg
            }
        }else if (totalBalance < 100 && totalBalance > 0    ){
            return {
                title: "Legal!",
                description: "É... mais ou menos, mais ou menos, mais ou menos",
                footerText: "Você está quase lucrando",
                icon: grinningImg
            }
        } else{
            return {
                title: "Muito bem!",
                description: "Seu saldo está positivo. Continue assim!",
                footerText: "Procure investir um pouco do saldo extra!",
                icon: happyImg
            }
        }
    },[totalBalance]);


    const relationExpensevesRecurrentVersusEventual = useMemo(() => {
        let amountRecurrent = 0;
        let amountEventual = 0;

        expenses
        .filter((expense) => {
            const date = new Date(expense.date);
            const year = date.getFullYear();
            const month = date.getMonth() + 1;

            return month === monthSelected && year === yearSelected;
        })
        .forEach((expense) => {
            if(expense.frequency === 'recorrente'){
                return amountRecurrent += Number(expense.amount);
            }

            if(expense.frequency === 'eventual'){
                return amountEventual += Number(expense.amount);
            }
        });

        const total = amountRecurrent + amountEventual;

        const percentRecurrent = Number(((amountRecurrent / total) * 100).toFixed(1));
        const percentEventual = Number(((amountEventual / total) * 100).toFixed(1));

        return [
            {
                name: 'Recorrentes',
                amount: amountRecurrent,
                percent: percentRecurrent ? percentRecurrent : 0, 
                color: "#ed7c02"
            },
            {
                name: 'Eventuais',
                amount: amountEventual,
                percent: percentEventual ? percentEventual : 0,
                color: "#d64040"
            }
        ];
    },[monthSelected, yearSelected]);

    const relationGainsRecurrentVersusEventual = useMemo(() => {
        let amountRecurrent = 0;
        let amountEventual = 0;

        gains
        .filter((gain) => {
            const date = new Date(gain.date);
            const year = date.getFullYear();
            const month = date.getMonth() + 1;

            return month === monthSelected && year === yearSelected;
        })
        .forEach((gain) => {
            if(gain.frequency === 'recorrente'){
                return amountRecurrent += Number(gain.amount);
            }

            if(gain.frequency === 'eventual'){
                return amountEventual += Number(gain.amount);
            }
        });

        const total = amountRecurrent + amountEventual;

        const percentRecurrent = Number(((amountRecurrent / total) * 100).toFixed(1));
        const percentEventual = Number(((amountEventual / total) * 100).toFixed(1));

        return [
            {
                name: 'Recorrentes',
                amount: amountRecurrent,
                percent: percentRecurrent ? percentRecurrent : 0,
                color: "#ed7c02"
            },
            {
                name: 'Eventuais',
                amount: amountEventual,
                percent: percentEventual ? percentEventual : 0,
                color: "#d64040"
            }
        ];
    },[monthSelected, yearSelected]);


    const historyData = useMemo(() => {
        return listOfMonths
        .map((_, month) => {
            
            let amountEntry = 0;
            gains.forEach(gain => {
                const date = new Date(gain.date);
                const gainMonth = date.getMonth();
                const gainYear = date.getFullYear();

                if(gainMonth === month && gainYear === yearSelected){
                    try{
                        amountEntry += Number(gain.amount);
                    }catch{
                        throw new Error('amountEntry is invalid. amountEntry must be a valid number.')
                    }
                }
            });

            let amountOutput = 0;
            expenses.forEach(expense => {
                const date = new Date(expense.date);
                const expenseMonth = date.getMonth();
                const expenseYear = date.getFullYear();

                if(expenseMonth === month && expenseYear === yearSelected){
                    try{
                        amountOutput += Number(expense.amount);
                    }catch{
                        throw new Error('amountOutput is invalid. amountOutput must be a valid number.')
                    }
                }
            });


            return {
                monthNumber: month,
                month: listOfMonths[month].substr(0, 3),
                amountEntry,
                amountOutput
            }
        })
        .filter(item => {
            const currentMonth = new Date().getMonth();
            const currentYear = new Date().getFullYear();
            return (yearSelected === currentYear && item.monthNumber <= currentMonth) || (yearSelected < currentYear)
        });
    },[yearSelected]);

    
    return (
        <Container>
            <ContentHeader title="Dashboard" lineColor="#ed7c02">
                <SelectInput options={months} onChange={(e) => setMonthSelected(Number(e.target.value))} defaultValue={monthSelected}/>
                <SelectInput options={years} onChange={(e) => setYearSelected(Number(e.target.value))} defaultValue={yearSelected}/>
            </ContentHeader>

            <Content>
                <WalletCard
                    title="Saldo"
                    color="#d64040"
                    amount={totalBalance}
                    footer="Atualizado com bases nas entradas e saídas"
                    icon="dollar" 
                />
                <WalletCard
                    title="Entradas"
                    color="#0088d1"
                    amount={totalGains}
                    footer="Atualizado com bases nas entradas"
                    icon="arrowDown" 
                />
                <WalletCard
                    title="Saídas"
                    color="#ed7c02"
                    amount={totalExpenses}
                    footer="Atualizado com bases nas saídas"
                    icon="arrowUp" 
                />

                <MessageBox
                    title={message.title}
                    description={message.description}
                    footerText={message.footerText}
                    icon={message.icon}
                />
                
                <PieChartBox data={relationExpensesVersusGains} />


                <HistoryBox 
                    data={historyData} 
                    lineColorAmountEntry="#ed7c02"
                    lineColorAmountOutput="#d64040"
                />


                <BarChartBox 
                    title="Saídas"
                    data={relationExpensevesRecurrentVersusEventual} 
                />
                
                <BarChartBox 
                    title="Entradas"
                    data={relationGainsRecurrentVersusEventual} 
                />
                
            </Content>
        </Container>
    );
}

export default Dashboard;