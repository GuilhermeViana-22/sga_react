import React, {useRef} from 'react';
import Chart from 'chart.js/auto';
import {
    Grid,
    Card,
    CardHeader,
    CardContent,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    InputLabel,
} from '@material-ui/core';
import {useEffect} from 'react';

const Main = () => {
    const chartRef = useRef(null);

    //constantes da tabela
    const rows = [
        {senha: '123', nome: 'Fulano'},
        {senha: '456', nome: 'Ciclano'},
        {senha: '789', nome: 'Beltrano'},
        {senha: '782349', nome: 'José '},
    ];

    useEffect(() => {
        if (chartRef.current) {
            // Se já existe um gráfico, destrói antes de criar um novo
            chartRef.current.destroy();
        }

        const ctx = document.getElementById('myChart').getContext('2d');
        chartRef.current = new Chart(ctx, {
            //basta alterar o tipo grafio
            //bubble
            //line
            //polarArea
            //radar
            //scatter
            type: 'bar',
            data: {
                labels: ['Label 1', 'Label 2', 'Label 3', 'Label 4', 'Label 5'],
                datasets: [
                    {
                        label: 'Dataset 1',
                        data: [10, 20, 30, 40, 50],
                        backgroundColor: 'rgba(0,88,255,0.65)',
                        borderColor: 'rgb(23,1,79)',
                        borderWidth: 1,
                    },
                ],
            },
            options: {
                scales: {
                    yAxes: [
                        {
                            ticks: {
                                beginAtZero: true,
                            },
                        },
                    ],
                },
            },
        });
    }, []);


    //estrutura do donnut
    const doughnutRef = useRef(null);

    useEffect(() => {
        if (doughnutRef.current) {
            // Se já existe um gráfico, destrói antes de criar um novo
            doughnutRef.current.destroy();
        }

        const ctx = document.getElementById('doughnutChart').getContext('2d');
        doughnutRef.current = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Quantidade de mulheres', 'Quantidade de homens'],
                datasets: [
                    {
                        label: 'Dataset 1',
                        //data int
                        // são dados interiros que alteram a forma como a tabela se demontra
                        data: [50, 50],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.6)',
                            'rgba(54, 162, 235, 0.6)',

                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',

                        ],
                        borderWidth: 1,
                    },
                ],
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                    },
                    title: {
                        display: true,
                        text: 'Gráfico de Rosca',
                    },
                },
            },
        });
    }, []);

    return (
        <main style={{marginLeft: '250px', padding: '20px'}}>
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <Card>
                        <CardHeader title="Diária de pacientes"/>
                        <CardContent className={"formularios"}>
                            <Grid container spacing={3}>
                                <Grid item xs={5}>
                                    <InputLabel style={{padding: '0.5rem'}}>Dados Unidade</InputLabel>
                                    <br/>
                                    <canvas id="myChart" style={{width: '100vh', marginLeft: '0'}}></canvas>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={6}>
                    <Card>
                        <CardHeader title="Histórico de senhas"/>
                        <CardContent className={"formularios"}>
                            <Grid container spacing={3}>
                                <Grid item xs={6}>
                                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                        <TableContainer>
                                            <Table>
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell>Senha</TableCell>
                                                        <TableCell>Nome do paciente</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {rows.map((row, index) => (
                                                        <TableRow key={index}>
                                                            <TableCell>{row.senha}</TableCell>
                                                            <TableCell>{row.nome}</TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </div>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={6}>
                    <Card>
                        <CardHeader title="Homens e mulheres na Unidade"/>
                        <CardContent className={"formularios"}>
                            <Grid container spacing={3}>
                                <Grid item xs={6}>
                                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                        <canvas id="doughnutChart"
                                                style={{width: '80%', height: 'auto', marginLeft: '50´x'}}></canvas>
                                    </div>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </main>
    );
};

export default Main;
