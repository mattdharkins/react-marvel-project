import React from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Button } from '@mui/material';
import { chooseName,chooseIdentityName, chooseImageUrl, chooseAbilities, chooseSubUniverse, 
    chooseMovieAppearances, chooseTvAppearances } from '../../redux/slices/rootSlice'
import { Input } from '../sharedComponents';
import { server_calls } from '../../api';
import { useGetData } from '../../custom-hooks';

interface CharacterFormProps{
    id?: string;
    data?: {}
}

interface CharacterState{
    name: string;
    identity_name: string;
    image_url: string;
    abilities: string;
    sub_universe: string;
    movie_appearances: string;
    tv_appearances: string;
}

export const CharacterForm = (props: CharacterFormProps) =>{
    const dispatch = useDispatch();
    let { characterData, getData } = useGetData();
    const store = useStore();
    const name = useSelector<CharacterState>(state => state.name)
    const identity_name = useSelector<CharacterState>(state => state.identity_name)
    const image_url = useSelector<CharacterState>(state => state.image_url)
    const abilities = useSelector<CharacterState>(state => state.abilities)
    const sub_universe = useSelector<CharacterState>(state => state.sub_universe)
    const movie_appearances = useSelector<CharacterState>(state => state.movie_appearances)
    const tv_appearances = useSelector<CharacterState>(state => state.tv_appearances)


    const { register, handleSubmit } = useForm({ })
    const onSubmit = async ( data: any, event:any ) =>{
        console.log(props.id)

        if (props.id!){
            await server_calls.update(props.id!, data)
            console.log(`Updated Character: ${props.id}`)
            window.location.reload()
            event.target.result();
        } else {
            dispatch(chooseName(data.name))
            dispatch(chooseIdentityName(data.identity_name))
            dispatch(chooseImageUrl(data.image_url))
            dispatch(chooseAbilities(data.abilities))
            dispatch(chooseSubUniverse(data.sub_universe))
            dispatch(chooseMovieAppearances(data.movie_appearances))
            dispatch(chooseTvAppearances(data.tv_appearances))
            await server_calls.create(store.getState())
            window.location.reload()
        }
    }
    return (
        <div>
            <form onSubmit = {handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="name">Character Name</label>
                    <Input {...register('name')} name="name" placeholder='Name' />
                </div>
                <div>
                    <label htmlFor="identity_name">Identity Name</label>
                    <Input {...register('identity_name')} name="identity_name" placeholder="Identity Name"/>
                </div>
                <div>
                    <label htmlFor="image_url">Image URL</label>
                    <Input {...register('image_url')} name="image_url" placeholder="Image URL"/>
                </div>
                <div>
                    <label htmlFor="abilities">Abilities</label>
                    <Input {...register('abilities')} name="abilities" placeholder="abilities"/>
                </div>
                <div>
                    <label htmlFor="sub_universe">Sub Universe</label>
                    <Input {...register('sub_universe')} name="sub_universe" placeholder="Sub Universe"/>
                </div>
                <div>
                    <label htmlFor="movie_appearances">Movie Appearances</label>
                    <Input {...register('movie_appearances')} name="movie_appearances" placeholder="Movie Appearances"/>
                </div>
                <div>
                    <label htmlFor="tv_appearances">TV Appearances</label>
                    <Input {...register('tv_appearances')} name="tv_appearances" placeholder="TV Appearances"/>
                </div>
                <Button type='submit'>Submit</Button>
            </form>
        </div>
    )
}

