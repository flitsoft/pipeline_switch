
Usage example 

Using cli

`node index.js  --project flit_ride -t cd --value=codemagic.io/flitsoft.flitride`


Using github action

```
  steps:
    - uses: flitsoft/pipeline_switch
      with:
        type: ci
        project: flit_ride
        value: github.com/${{ GITHUB_REPOSITORY }}
```
