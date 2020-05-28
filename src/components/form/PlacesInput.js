import React from 'react'
import PlacesAutocomplete from 'react-places-autocomplete'
import { Form ,Label, Segment, List} from 'semantic-ui-react'
const PlacesInput = ({ 
    input:{value,onChange,onBlur},
    width,
    options,
    placeholder,
    onSelecter,
    meta: { touched, error, warning }}) => {
    return (
        <PlacesAutocomplete 
        value={value}
        onChange={onChange}
        onSelect={onSelecter}
        searchOptions={options}>
             {({getInputProps,suggestions,getSuggestionItemProps,loading})=>(
                 <Form.Field error={touched&& !!error}>
                     <input placeholder={placeholder} {...getInputProps({placeholder,onBlur})}/>
                    {touched &&((error && <Label basic color='red'>{error}</Label>) ||(warning && <Label basic color='red'>{warning}</Label>))}
                    {suggestions.length>0&&(
                        <Segment style={{marginTop:0,
                                        position:'absolute',
                                        zIndex:1000,
                                        width:'100%'}}>
                            {loading&&<div>loading....</div>}
                            <List selection>
                                {suggestions.map((suggestion)=>(
                                    <List.Item {...getSuggestionItemProps(suggestion)}>
                                        <List.Header>
                                            {suggestion.formattedSuggestion.mainText}
                                        </List.Header>
                                        <List.Description>
                                        {suggestion.formattedSuggestion.secondaryText}
                                        </List.Description>
                                    </List.Item> 
                                )

                                )}
                            </List> 
                        </Segment>
                    )}
                 </Form.Field>
             )

             }
       
        </PlacesAutocomplete>
    )
}
export default PlacesInput