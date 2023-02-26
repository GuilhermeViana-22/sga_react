import React from 'react';
import { Grid, Card, CardHeader, CardContent, CardActions, TextField, Button } from '@material-ui/core';

const Main = ({ children }) => {
    return (
        <main style={{ marginLeft: '250px', padding: '20px' }}>
            {children}
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Card>
                        <CardHeader title="Cadastro de Unidades" />
                        <CardContent>
                            <Grid container spacing={3}>
                                <Grid item xs={8}>
                                    <TextField fullWidth label="Descrição" />
                                </Grid>
                                <Grid item xs={4}>
                                    <TextField fullWidth label="CEP" />
                                </Grid>
                            </Grid>
                        </CardContent>
                        <CardActions>
                            <Button variant="contained" color="primary">Salvar</Button>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
        </main>
    );
};

export default Main;
