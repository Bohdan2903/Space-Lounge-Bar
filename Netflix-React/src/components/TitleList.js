import React, { Component } from "react";
import Item from "./Item";

export default class TitleList extends Component {
    apiKey = "87dfa1c669eea853da609d4968d294be";
    constructor(props) {
        super(props);
        this.state = {
            data: {results:[]},
            error: false,
            mounted: false
        };
    }

    loadContent = () => {
        const requestUrl = "https://api.themoviedb.org/3/" + this.props.url + "&api_key=" + this.apiKey;
        if (this.props.url)
        fetch(requestUrl)
            .then(response => response.json())
            .then(data => {
                this.setState({data: data});
            })
            .catch(err => {
                console.log("There has been an error: " + err);
                this.setState({error: true});
            });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.url !== this.props.url && nextProps.url !== "") {
            this.setState({
                mounted: true,
                url: nextProps.url
            }, () => this.loadContent());

        }
    }

    componentDidMount() {
        if (this.props.url !== "") {
            this.loadContent();
            this.setState({mounted: true});
        }
    }

    render() {
        let titles = "";
        if (Array.isArray(this.state.data.results))
        titles = this.state.data.results.map((title, i) => {
            console.log(title);
            if (i < 5) {
                let name = "";
                let  background;
                let link = 'https://image.tmdb.org/t/p/original';
                
                if(typeof title.backdrop_path !== undefined){
                    background = link + title.poster_path;
                }
                else{
                    background = link + title.backdrop_path;
                }
                if (!title.name) {
                    name = title.original_title;
                } else {
                    name = title.name;
                }
                return (
                    <Item key={title.id} 
                            name={name} 
                            background={background} 
                            rating={title.vote_average} 
                            plot={title.overview}
                    />
                );
            } else {
                return (<div key={title.id}></div>);
            }
        });
        return (
            <div ref="titlecategory" className="TitleList">
                <div className="Title">
                    <h1>{this.props.title}</h1>
                    <div className="titles-wrapper">
                        {titles}
                
                    </div>
                </div>
            </div>
        );
    }
} 