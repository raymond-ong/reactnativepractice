import React, { Component } from 'react';
import { TouchableHightLight, Text, View } from 'react-native';
import { SearchBar } from 'react-native-elements'
import { ListItem } from 'react-native-elements'

var _ = require('lodash');

export default class Searchbox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchResults: [{
                name: 'Hi',
                description: 'Hello'
            }]
        };
    }

    render() {
        return (
        <View>
            <SearchBar
                lightTheme
                onChangeText={this.onChangeText.bind(this)}
                onClear={this.someMethod}
                placeholder='Type Here...' />

            {
            _.map(this.state.searchResults, (result) => (
                <ListItem
                key={result.name}
                title={result.name}
                subtitle={result.description}
              />
            ))}
        </View>);
    }

    onChangeText(newText) {
        var me = this;
        console.log('[DEBUG] On Change text:' + newText);
        // var searchData = {
        //     "query": {
        //         "bool": {
        //             "should": [
        //                 {
        //                     "match": {"firstname":"raymond"}
        //                 },
        //                 {
        //                     "match": {"lastname":"ong"}
        //                 }
        //             ]
        //         }
        //     }
        // };
        //fetch('http://192.168.1.185:3001/products').then(resp => resp.text()).then(t => console.log(t));
        //console.log(JSON.stringify(searchData));

        // var searchData = {
        //     "query": {
        //         "match_all": {}
        //     }
        // } 
        
        var searchData = {
            "from" : 0, "size" : 10,
            "query": {
                "bool": {
                    "filter": [
                        {
                            "wildcard" : { "name" : '*' + newText.toLowerCase() + '*' }
                        }
                    ]
                }
            },
            "sort" : [
                { "displayname" : {"order" : "asc"}}
            ] 	
        };        
        
        //fetch('http://10.0.2.2:9200/votersearcher2/_search', {
        fetch('http://10.0.2.2:9200/pos/products/_search', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(searchData)
            //body: '{"query":{"bool":{"must":[{"match_all":{}}],"must_not":[],"should":[]}},"from":0,"size":10,"sort":[],"aggs":{}}'
        })
        .then((resp) => (resp.json()))
        .catch(error => console.error(error))
        .then((jsonObj) => {
            if (!jsonObj.hits && !jsonObj.hits.hits) {
                return;
            }
            //console.log(jsonObj.hits.hits);
            console.log(me.state.searchResults);
            var items = [];
            _.each(jsonObj.hits.hits, function(hit) {
                console.log(me.state);
                console.log('hit: ' + hit._source.description);
                items.push({
                    name: hit._source.name,
                    description: hit._source.description
                });
            });
            me.setState({
                searchResults: items
            });
            //this.printObject(jsonStr);
        });
        
    }

    onSearchButtonPress() {
        console.log('[DEBUG] On Search button pressed');
    }

    printObject(inObj) {
        for (var prop in inObj) {
            console.log('[' + prop + ']' + inObj[prop]);
        }
    }

    onCancelButtonPress() {
        console.log('[DEBUG] On Cancel button pressed');
    }
}
