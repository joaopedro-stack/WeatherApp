import { useEffect, useState } from 'react';
import './HourNow.css'

const DataHoraAtual = () => {
    const [dataHora, setDataHora] = useState({
        hora: '',
        diaSemana: '',
        dia: '',
        mes: ''
    });

    useEffect(() => {
        const atualizarDataHora = () => {
            const agora = new Date();

            const hora = agora.toLocaleTimeString('pt-BR', {
                hour: '2-digit',
                minute: '2-digit'
            });

            const diasSemana = [
                'Dom', 'Seg', 'Ter', 'Qua',
                'Qui', 'Sex', 'Sáb'
            ];
            const diaSemana = diasSemana[agora.getDay()];

            const dia = agora.getDate();

            const meses = [
                'Jan', 'Fev', 'Mar', 'Abr',
                'Mai', 'Jun', 'Jul', 'Ago',
                'Set', 'Out', 'Nov', 'Dez'
            ];
            const mes = meses[agora.getMonth()];

            const ano = agora.getFullYear();

            setDataHora({ ano, hora, diaSemana, dia, mes });
        };

        atualizarDataHora();
        const intervalo = setInterval(atualizarDataHora, 1000);

        return () => clearInterval(intervalo);
    }, []);

    return (
        <div>
            <p>{dataHora.hora} - {dataHora.diaSemana}, {dataHora.dia} de {dataHora.mes} de {dataHora.ano}</p>
        </div>
    );
};

export default DataHoraAtual;
