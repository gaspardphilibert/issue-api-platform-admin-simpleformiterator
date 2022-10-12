import { fetchHydra, HydraAdmin, hydraDataProvider, ResourceGuesser } from "@api-platform/admin";
import { ArrayInput, Create, Edit, SimpleForm, SimpleFormIterator, TextField, TextInput } from "react-admin"
import { parseHydraDocumentation } from "@api-platform/api-doc-parser";

const dirtyFix = (data) => {
    let newData = {...data}
    newData.books.map((e: any) => {
        if(e["@id"] === "") {
            delete e["@id"]
        }
        return e
    })
    return newData
}

const AuthorEdit = (props) => (
    <Edit resource="authors" {...props} /*transform={dirtyFix}*/>
      <SimpleForm>
        <TextInput source="name"/>
        <ArrayInput source="books">
            <SimpleFormIterator>
                <TextInput source="name"/>
            </SimpleFormIterator>
        </ArrayInput>
      </SimpleForm>
    </Edit>
)

  const AuthorNew = () => (
    <Create resource="authors">
      <SimpleForm>
        <TextInput source="name"/>
        <ArrayInput source="books">
            <SimpleFormIterator>
                <TextInput source="name"/>
            </SimpleFormIterator>
        </ArrayInput>
      </SimpleForm>
    </Create>
)
const entrypoint = process.env.REACT_APP_API_ENTRYPOINT;
const dataProvider = hydraDataProvider({
    entrypoint,
    httpClient: fetchHydra,
    apiDocumentationParser: parseHydraDocumentation,
    mercure: false,
    useEmbedded: true,
});

const MyAdmin = () => (
    <HydraAdmin entrypoint={window.origin}>
        <ResourceGuesser name="books"></ResourceGuesser>
        <ResourceGuesser name="authors" create={AuthorNew} edit={AuthorEdit}></ResourceGuesser>
    </HydraAdmin>
)

export default MyAdmin;