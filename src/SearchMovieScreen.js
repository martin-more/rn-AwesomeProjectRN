import React from "react";
import { Container, Header, Title, Left, Right, Button, Body, Content, Text, View, Item, Label, Input} from "native-base";

import searchInAwesomeApp from './SearchInAwesomeApp.js';

export default class SearchMovieScreen extends React.Component {

    state = {
        title: '',
        owner: '',
        fromAndroid: ''
    };

    componentDidMount() {}

    componentWillMount() {}

    _onSubmit = () => {
        console.log(JSON.stringify(this.state));
        searchInAwesomeApp(JSON.stringify(this.state))
          .then( response => {
            console.log('movie response: %s', JSON.stringify(response));
            this.setState({fromAndroid: response.data.msgResponse});
          })
          .catch (error => {
            console.log('failed on searchInAwesomeApp call');
            console.log(JSON.stringify(error));
          });
    }

    render() {
        return (
            <Container>
                <Header>
                    <Left />
                    <Body style={{ flex: 3 }}>
                        <Title>{'Search Movie'}</Title>
                    </Body>
                    <Right />
                </Header>
                <Content padder>
                    <View>
                        <Item key={1}>
                            <Input placeholder={'Movie title'} onChangeText={(text) => this.setState({title: text})}/>
                        </Item>
                        <Item key={2}>
                            <Input placeholder={'Owner name'} onChangeText={(text) => this.setState({owner: text})}/>
                        </Item>
                    </View>
                    <Button block onPress={() => this._onSubmit()}>
                        <Text>Submit</Text>
                    </Button>
                    <View>
                        <Label>from android: <Label style={{color: 'red'}}>{this.state.fromAndroid}</Label></Label>
                    </View>
                </Content>
            </Container>
        );
    }
}


