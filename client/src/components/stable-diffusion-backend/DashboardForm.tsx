import { useStore } from '@nanostores/react';
import { generatedRequestStore, generatedResponseStore, generateLoadingStore, generateLogoIconStore } from './store';
import { generate } from './api';

const styles = {
  formGroup: "grid grid-cols-2 gap-4",
  formDiv: "form-group mb-6",
  label: "form-label inline-block mb-2 text-gray-700",
  input: "form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none",
  small: "block mt-1 text-xs text-gray-600",

  button: "px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
}

export default function Form(props: {serverURL: string}) {
  const $request = useStore(generatedRequestStore);
  const $generateLoading = useStore(generateLoadingStore);
  const $generateLogoIcon = useStore(generateLogoIconStore);

  function requestStoreSetOnChange(event: any, key: any) {
    const newValue = event.target.value;
    generatedRequestStore.setKey(key, newValue)
  }

  function preventNonNumeric(event: any, allowedDot?: boolean) {
    // console.debug(event.which)

    if (event.which >= 37 && event.which <= 40) return // navigation

    if (allowedDot && event.which == 190) { // Dot
      if ((event.target.value.split(".").length - 1 == 0)) return // only 1 dot allowed
    } 
    
    if (event.which == 8) return // Delete

    if (event.which < 48 || event.which > 57) {
      event.preventDefault();
    }
  };

  return (
    <div className={`p-6 rounded-lg shadow-lg bg-white max-w-sm h-min ${$generateLoading ? "animate-pulse": ""}`}>
      <form>
        <div className={styles.formDiv}>
          <label htmlFor="prompt" className={styles.label} >
            Prompt
          </label>
          <textarea className={styles.input} id="prompt"
            aria-describedby="promptHelp"
            rows={3}
            maxLength={77}
            value={$request.prompt}
            readOnly={$generateLoading}
            onChange={e => requestStoreSetOnChange(e, "prompt")} />
          <small id="promptHelp" className={styles.small} >
            What you want to be generated.
          </small>
        </div>

        <div className={styles.formDiv}>
          <input className="appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
            type="checkbox"
            id="logo-icon"
            defaultChecked={$generateLogoIcon}
            onChange={e => generateLogoIconStore.set(e.target.checked)} />
          <label className="inline-block text-gray-800 select-none" htmlFor="logo-icon">
            Generate logo/icon
          </label>
        </div>

        <div className={styles.formDiv}>
          <label htmlFor="negative_prompt" className={styles.label} >
            Negative prompt
          </label>
          <textarea className={styles.input} id="negative_prompt"
            aria-describedby="negative_promptHelp"
            rows={3}
            maxLength={77}
            value={$request.negative_prompt}
            readOnly={$generateLoading}
            onChange={e => requestStoreSetOnChange(e, "negative_prompt")} />
          <small id="negative_promptHelp" className={styles.small} >
            What you do not want to be generated.
          </small>
        </div>

        <div className={styles.formDiv}>
          <label htmlFor="num_images" className={styles.label} >
            Number of images
          </label>
          <input type="number" className={styles.input} id="num_images"
            aria-describedby="num_imagesHelp" min="1" max="20"
            value={$request.num_images}
            readOnly={$generateLoading}
            onKeyDown={e => preventNonNumeric(e)}
            onChange={e => requestStoreSetOnChange(e, "num_images")} />
          <small id="num_imagesHelp" className={styles.small} >
            How many images you want to generate
          </small>
        </div>

        <div className={styles.formGroup}>
          <div className={styles.formDiv}>
            <label htmlFor="width" className={styles.label} >
              Width
            </label>
            <input type="number" className={styles.input} id="width"
              aria-describedby="widthHelp" min="1" max="99999"
              value={$request.width}
              readOnly={$generateLoading}
              onKeyDown={e => preventNonNumeric(e)}
              onChange={e => requestStoreSetOnChange(e, "width")} />
            <small id="widthHelp" className={styles.small} >
              Image width
            </small>
          </div>
          <div className={styles.formDiv}>
            <label htmlFor="height" className={styles.label} >
              Height
            </label>
            <input type="number" className={styles.input} id="height"
              aria-describedby="heightHelp" min="1" max="99999"
              value={$request.height}
              readOnly={$generateLoading}
              onKeyDown={e => preventNonNumeric(e)}
              onChange={e => requestStoreSetOnChange(e, "height")} />
            <small id="heightHelp" className={styles.small} >
              Image height
            </small>
          </div>
        </div>

        <div className={styles.formDiv}>
          <label htmlFor="guidance_scale" className={styles.label} >
            Guidance scale
          </label>
          <input type="number" className={styles.input} id="guidance_scale"
            aria-describedby="guidance_scaleHelp" min="1" max="200"
            value={$request.guidance_scale}
            readOnly={$generateLoading}
            onKeyDown={e => preventNonNumeric(e, true)}
            onChange={e => requestStoreSetOnChange(e, "guidance_scale")} />
          <small id="guidance_scaleHelp" className={styles.small} >
            A scale
          </small>
        </div>

        <div className={styles.formDiv}>
          <label htmlFor="seed" className={styles.label} >
            Seed
          </label>
          <input type="number" className={styles.input} id="seed"
            aria-describedby="seedHelp"
            value={$request.seed}
            readOnly={$generateLoading}
            onKeyDown={e => preventNonNumeric(e)}
            onChange={e => requestStoreSetOnChange(e, "seed")} />
          <small id="seedHelp" className={styles.small} >
            Seed is a number which dictates the generation procedure
          </small>
        </div>

        <div className={styles.formDiv}>
          <label htmlFor="num_inference_steps" className={styles.label} >
            Number of inference steps
          </label>
          <input type="number" className={styles.input} id="num_inference_steps"
            aria-describedby="num_inference_stepsHelp"
            value={$request.num_inference_steps}
            readOnly={$generateLoading}
            onKeyDown={e => preventNonNumeric(e)}
            onChange={e => requestStoreSetOnChange(e, "num_inference_steps")} />
          <small id="num_inference_stepsHelp" className={styles.small} >
            Larger the number, higher the quality
          </small>
        </div>
    
        <button type="button" className={styles.button} disabled={$generateLoading}
          onClick={e => {
            generate(props.serverURL, generatedRequestStore.get()).then((response) => {
              generatedResponseStore.set(response);
            })
          }} >
            Generate
        </button>
      </form>
    </div>
  )
}