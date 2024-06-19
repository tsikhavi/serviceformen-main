import { useEffect, useMemo, useRef, useState } from "react";
import { useActions } from "../../hooks/useActions";
import { Close as CloseIcon } from "../../assets/Close";
import { useTranslation } from "react-i18next";
import styles from "./Modal.module.sass";
import axios from "../../utils/axios";

interface IUpdatePositionInfoModalProps {
  agency_id: number;
  model_id: number;
  handlerButtonClick: Function;
}

function useFocus<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T>(null);
  const setFocus = () => ref?.current?.focus?.();
  return [ref, setFocus] as const;
}

const UpdatePositionInfoModal: React.FC<IUpdatePositionInfoModalProps> = ({ handlerButtonClick, agency_id, model_id }) => {
  const { t } = useTranslation();
  const { getModels } = useActions();
  const [verificationStarted, setVerificationStarted] = useState(false);
  const [decodedKey, setDecodedKey] = useState('');
  const [newKey, setNewKey] = useState('');
  const [shader, setShader] = useState('');
  const [decryptData, setDecryptData] = useState([] as any[]);
  const [step, setStep] = useState(-1);
  const token = useMemo(() => getToken(), []);
  const [finalText, setFinalText] = useState('');
  const [inputRef, setInputFocus] = useFocus<HTMLInputElement>();
  const [program, setProgram] = useState(null);
  const [frameId, setFrameId] = useState(null as any);

  function getToken() {
    const token = window.localStorage.getItem("esco_token") || '...';
    return token.split('.')[2]
  }

  const closeButtonClick = () => {
    handlerButtonClick()
  }
    
  useEffect(() => {
    if (shader && verificationStarted) {
      window.cancelAnimationFrame(frameId);
      window.cancelAnimationFrame(frameId - 1);
      window.cancelAnimationFrame(frameId + 1);

      drawCanvas(shader)
    }
  }, [shader, verificationStarted]);

  useEffect(() => {
    if (finalText && frameId) {
      window.cancelAnimationFrame(frameId);
      window.cancelAnimationFrame(frameId - 1);
      window.cancelAnimationFrame(frameId + 1);

    }
  }, [finalText]);

  const startVerification = async () => {
    const captcha = await axios.post("/api/create_captcha", {
      params: {
        agency_id: agency_id,
        model_id: model_id,
      },
    }).then((response) => response.data);

    if (captcha && captcha.success === true) {
      const decryptKey = await decryptString(captcha.key, token);
      const parsed = JSON.parse(decryptKey);

      setDecryptData(parsed)
      setStep(0);
      setShader(parsed[0].value)
    }

    setVerificationStarted(true)
  }

  // Function to decrypt a string using a token
  async function decryptString(encryptedHex, token) {
    const encodedToken = new TextEncoder().encode(token);
    const encryptedData = new Uint8Array(encryptedHex.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));

    // Derive a key from the token
    const key = await window.crypto.subtle.importKey(
        "raw",
        encodedToken,
        { name: "PBKDF2" },
        false,
        ["deriveKey"]
    );

    // Derive an encryption key using the derived key
    const derivedKey = await window.crypto.subtle.deriveKey(
        {
            name: "PBKDF2",
            salt: new Uint8Array(0), // Empty salt
            iterations: 100000,
            hash: "SHA-256"
        },
        key,
        { name: "AES-GCM", length: 256 },
        false,
        ["decrypt"]
    );

    const iv = encryptedData.slice(0, 12);
    const encryptedContent = encryptedData.slice(12);
    
    // Decrypt the encrypted data using the derived encryption key
    const decryptedData = await window.crypto.subtle.decrypt(
        { name: "AES-GCM", iv: iv },
        derivedKey,
        new Uint8Array(encryptedContent.buffer) // Convert ArrayBuffer to Uint8Array
    );

    // Decode the decrypted data to a string
    return new TextDecoder().decode(decryptedData);
  }

  function drawCanvas(fsSource: string) {
    const canvas = document.getElementById('canvas2D') as any;
    const gl = canvas.getContext('webgl2');

    if (frameId) {
      window.cancelAnimationFrame(frameId);
      window.cancelAnimationFrame(frameId - 1);
      window.cancelAnimationFrame(frameId + 1);
      setFrameId(-2)
    }
    if (program) {
      gl.deleteProgram(program);
    }

    if (!gl) {
        console.error('Unable to initialize WebGL. Your browser may not support it.');
        return;
    }

    const vsSource = `#version 300 es
        in vec4 a_position;
        void main() {
            gl_Position = a_position;
        }
    `;

    const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
    const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

    const shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);
    

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        console.error('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
        return null;
    }

    gl.useProgram(shaderProgram);

    const resolutionLocation = gl.getUniformLocation(shaderProgram, "u_resolution");
    gl.uniform2f(resolutionLocation, canvas.width, canvas.height);

    const positionAttributeLocation = gl.getAttribLocation(shaderProgram, 'a_position');
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    const positions = [
        -1.0, -1.0,
        1.0, -1.0,
        -1.0,  1.0,
        1.0,  1.0
    ];

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    gl.enableVertexAttribArray(positionAttributeLocation);
    gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

    var startTime = performance.now();
    function animate() {
        var currentTime = performance.now();
        var elapsedTime = (currentTime - startTime) / 1000;

        // Set time uniform
        var timeLocation = gl.getUniformLocation(shaderProgram, "u_time");
        if (timeLocation) {
          gl.uniform1f(timeLocation, elapsedTime);
  
          // Clear canvas with background color
          gl.clearColor(0.0, 0.0, 0.0, 1.0);
          gl.clear(gl.COLOR_BUFFER_BIT);
  
          // Draw
          gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  
          // setTimeout(() => {
            setFrameId(requestAnimationFrame(animate))
          // }, 200)

        }
    }

    animate();
    setProgram(shaderProgram);
  }

  function loadShader(gl, type, source) {
      const shader = gl.createShader(type);

      gl.shaderSource(shader, source);
      gl.compileShader(shader);

      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
          console.error('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
          gl.deleteShader(shader);
          return null;
      }

      return shader;
  }

  async function submitNewKeyClick() {
    const lastKey = decodedKey + '' + newKey 
    setDecodedKey(lastKey)

    if (decryptData[step + 1]) {
      setShader(decryptData[step + 1].value);
      setStep(step + 1);
    } else {
      const verify = await axios.post("/api/verify_captcha", {
        params: {
          agency_id: agency_id,
          model_id: model_id,
          key: lastKey
        },
      }).then((response) => response.data);

      if (verify.success === true) {
        setFinalText(t("captcha.captcha_pass"))
      } else if (verify.success === false && verify.message && verify.message === "wrong_key") {
        setFinalText(t("captcha.captcha_not_pass"))
      } else {
        setFinalText(t("captcha.captcha_error"))
      }

      setTimeout(() => {
        getModels({ profile_id: -1 })
        handlerButtonClick();
      }, 1000)
    }
    setNewKey('');
    setInputFocus();
  }

  return (
    <div className={`${styles.modal} ${styles.info} ${styles.active}`}>
      <div className={`${styles.overlay} ${styles.active}`} />
      <div className={styles.modal_content}>
        <div className={styles.modal_close} onClick={() => closeButtonClick()}>
          <CloseIcon fill="#1B1B1B" />
        </div>
        {!finalText && !verificationStarted && <div className={styles.modal_verification_content}>
          <li>{t("captcha.description_text_1")}</li>
          <li>{t("captcha.description_text_2")}</li>
          <li>{t("captcha.description_text_3")}</li>
          <li>{t("captcha.description_text_4")}</li>
          <button className={styles.modal_start} type="button" onClick={() => startVerification()}>{t("global.start")}</button>
        </div>}
        {!finalText && verificationStarted && 
          <div className={styles.modal_verification_content}>
            <canvas id={'canvas2D'} width={200} height={200}></canvas>
            <div className={styles.verification_input}>
              <div>{t("model.update_position_modal_help")}</div>
              <input
                onChange={(event) => setNewKey(event.target.value.trim())}
                inputMode="numeric"
                value={newKey}
                ref={inputRef}
                autoFocus
                required
              />
            </div>
            <div>{t("model.update_position_numbers_left") + ' ' + (decryptData.length - step)}</div>
            <button type="submit" onClick={() => submitNewKeyClick()} disabled={!newKey || newKey.length <= 0}>
              {t("global.submit")}
            </button>
          </div>
        }
        {finalText ?? <li>{finalText}</li>}
      </div>
    </div>
  );
};

export default UpdatePositionInfoModal;
