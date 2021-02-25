### Features 0.1v

- Create data with object model.
- Get data object
- Update Data object

### Docs

###### OS.add(table, model);
```js
let userModel = {
  "name": "Steve",
  "fullname": "Jackson",
  "age": 14
}
OS.add("user", userModel)
```
*`Output: You have creating an table user with name, fullname and age models`*

###### OS.get(table);
```js
OS.get("user")
```
*`Output: Here we get the user table`*

###### OS.update(table, property, value);
```js
OS.update("user", "age", "15");
```
*`Output: Here we edit the age of Steve to 15 year old.`*

###### OS.select(table, property);
```js
OS.select("user", "age");
```
*`Output: Here we select property of specific table. (15)`*

###### OS.delete(table);
```js
OS.delete("user");
```
*`Output: We delete the table (key & value)`*

###### OS.infos();
```js
OS.infos();
```
*`Output: Give some informations of API and localStorage`*

##### Parameters
|   Name |  Desc  |
| ------------ | ------------ |
| table | *String*  |
| object | *Object*  |
| key | *String*, *Number*, *Boolean*|

