import React from 'react';
import { useMemo, useState, useEffect } from 'react';
import { Container, Content, Filters } from './style';
import { v4 } from 'uuid';

import gains from '../../repositories/gains';
import expenses from '../../repositories/expenses';
import listOfMonths from '../../repositories/months'

import {formatCurrency, formatDate}  from '../../utils/formatter';


import SelectInput from '../../components/SelectInput';
import ContentHeader from '../../components/ContentHeader'; 
import HistoryFinanceCard from '../../components/HistoryFinanceCard';

interface IRouteParams {
    match: {
        params: {
            type: string;
        }
    }
}

interface IData { 
    id: string;
    description: string;
    amountFormatted: string;
    frequency: string;
    dataFormatted: string;
    tagColor: string;
}

const Lists: React.FC<IRouteParams> = ({ match }) => {
    const [data, setData] = useState<IData[]>([]); 
    const [monthSelected, setMonthSelected] = useState<number>(new Date().getMonth() + 1);
    const [yearSelected, setYearSelected] = useState<number>(new Date().getFullYear());
    const [selectedFrequency, setSelectedFrequency] = useState<string[]>(['recorrente', 'eventual']);


    const { type } = match.params;

    const pageData = useMemo(() => {
        if (type === 'entry-balance'){
            return {
                title: 'Entradas',
                line: '#0088d1',
                list: gains
            }
        } else { 
            return {
                title: 'Saídas',
                line: '#d64040',
                list: expenses
            }
        }
    }, [type])

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


        pageData.list.forEach(item => {
            
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
    },[pageData.list]);

    const handleFrequencyClick = (frequency: string) => {
        const alreadySelected = selectedFrequency.findIndex(item => item === frequency);

        if (alreadySelected >= 0){
            const filtered = selectedFrequency.filter(item => item !== frequency);
            setSelectedFrequency(filtered);
            
        } else {
            setSelectedFrequency((prev) => [...prev, frequency]);
        }

    }

    useEffect(() => {

        const filteredResponse = pageData.list.filter(item => {
            const date = new Date(item.date);
            const month = date.getMonth() + 1;
            const year = date.getFullYear();

            return month === monthSelected && year === yearSelected && selectedFrequency.includes(item.frequency);
        });

        const response = filteredResponse.map(item => {
            return {
                id: v4(),
                description: item.description,
                amountFormatted: formatCurrency(Number(item.amount)),
                frequency: item.frequency,
                dataFormatted: formatDate(item.date),
                tagColor: item.frequency === 'recorrente' ? '#0088d1' : '#ed7c02',
            }
        });
        
        console.log(response);
        console.log(filteredResponse);
        setData(response);
    },[pageData.list, monthSelected, yearSelected, data.length, selectedFrequency]);

    return (
        <Container>
            <ContentHeader title={pageData.title} lineColor={pageData.line}>
                <SelectInput options={months} onChange={(e) => setMonthSelected(Number(e.target.value))} defaultValue={monthSelected}/>
                <SelectInput options={years} onChange={(e) => setYearSelected(Number(e.target.value))} defaultValue={yearSelected}/>
            </ContentHeader>

            <Filters>
                <button 
                    type="button" 
                    className={` tag-filter recurrent 
                    ${selectedFrequency.includes('recorrente') && 'tag-active'}`} 
                    onClick={() => handleFrequencyClick('recorrente')}
                >
                Recorrentes</button>

                <button 
                    type="button" 
                    className={`tag-filter eventual 
                    ${selectedFrequency.includes('eventual') && 'tag-active'}`}
                    onClick={() => handleFrequencyClick('eventual')}
                >
                Eventuais</button>


            </Filters>

            <Content>
                {
                    data.map(item => (
                        <HistoryFinanceCard 
                            key={item.id}
                            tagColor={item.tagColor}
                            title={item.description}
                            subtitle={item.dataFormatted}
                            amount={item.amountFormatted}
                        />
                    ))
                }
            </Content>
        </Container>
    );
}

export default Lists;