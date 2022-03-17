import {
  Box,
  TextField,
  Typography,
  Button,
  makeStyles,
} from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";
import { useMeeting, usePubSub } from "@videosdk.live/react-sdk";
import { useMeetingAppContext } from "../../MeetingAppContextDef";
import ConfirmBox from "../../components/ConfirmBox";
import { extractRootDomain, getUniqueId } from "../../utils/common";

const useStyles = makeStyles(() => ({
  textField: {
    borderRadius: "4px",
    backgroundColor: "#3D3C4E",
    color: "white",
  },
  button: {
    color: "#95959E",
    "&:hover": {
      color: "#ffffff",
    },
  },
  input: {
    color: "white",
  },
  root: {
    "& .MuiFilledInput-input": {
      padding: "12px 12px 12px",
    },
  },
}));

const SingleLiveStreamItem = ({
  item,
  setLiveStreamConfig,
  liveStreamConfigRef,
  isEditingId,
  setIsEditingId,
  _handleRemove,
  publish,
  isLiveStreaming,
}) => {
  const rootDomain = extractRootDomain(item.url);
  const mainDomain = rootDomain?.split(".")[0];
  const domainName = mainDomain.charAt(0).toUpperCase() + mainDomain.slice(1);

  // const [isEditing, setIsEditing] = useState({ id: null, editing: false });
  const isEditing = !!isEditingId;
  const isSelfEditing = isEditingId === item.id;
  const [editedUrl, setEditedUrl] = useState("");
  const [editedStreamKey, setEditedStreamKey] = useState("");
  const [editedUrlErr, setEditedUrlErr] = useState(false);
  const [editedStreamKeyErr, setEditedStreamKeyErr] = useState(false);
  const [onCancelClick, setOnCancelClick] = useState({
    id: null,
    visible: false,
  });
  const [onRemoveClick, setOnRemoveClick] = useState({
    id: null,
    domainName: "",
    visible: false,
  });

  const handleValidation = () => {
    let isValid = true;
    if (editedStreamKey.length === 0) {
      isValid = false;
      setEditedStreamKeyErr(true);
      return false;
    } else {
      setEditedStreamKeyErr(false);
    }
    if (editedUrl.length === 0) {
      isValid = false;
      setEditedUrlErr(true);
      return false;
    } else {
      setEditedUrlErr(false);
    }
    return isValid;
  };
  const itemRef = useRef(item);

  useEffect(() => {
    if (isSelfEditing) {
      setEditedUrl(itemRef.current.url);
      setEditedStreamKey(itemRef.current.streamKey);
    }
  }, [isSelfEditing]);

  useEffect(() => {
    itemRef.current = item;
  }, [item]);

  const classes = useStyles();

  const _handleSaveInsideArray = ({ Id, streamKey, url }) => {
    const liveStreamConfig = liveStreamConfigRef.current;

    const newPlatforms = liveStreamConfig.map((item) => {
      if (item.id === Id) {
        return {
          ...item,
          url,
          streamKey: streamKey,
          isEdit: false,
        };
      } else {
        return item;
      }
    });

    publish({ config: newPlatforms }, { persist: true });
    setLiveStreamConfig(newPlatforms);
  };

  return (
    <>
      <Box
        style={{
          borderBottom: "3px solid #3A3F4B",
          paddingRight: "12px",
          paddingLeft: "12px",
          paddingTop: "12px",
          paddingBottom: "12px",
        }}
      >
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box style={{ display: "flex", flex: 1 }}>
            <Typography variant={"body1"} style={{ fontWeight: "bold" }}>
              {item.url ? domainName : item.title}
            </Typography>
          </Box>

          <Box
            style={{
              display: "flex",
              flex: 1,
              alignItems: "flex-end",
              justifyContent: "flex-end",
            }}
          >
            {isSelfEditing ? (
              <>
                <Button
                  variant="text"
                  onClick={() => {
                    const isValid = handleValidation();
                    if (isValid) {
                      _handleSaveInsideArray({
                        Id: item.id,
                        streamKey: editedStreamKey,
                        url: editedUrl,
                      });
                      setIsEditingId(null);
                    }
                  }}
                  className={classes.button}
                >
                  Save
                </Button>
                <Button
                  variant="text"
                  onClick={() => {
                    setOnCancelClick({ id: item.id, visible: true });
                  }}
                  className={classes.button}
                >
                  Cancel
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="text"
                  onClick={() => {
                    // setIsEditing({ id: item.id, editing: true });
                    setIsEditingId(item.id);
                  }}
                  className={classes.button}
                  disabled={isEditing || isLiveStreaming}
                >
                  EDIT
                </Button>

                <Button
                  variant="text"
                  onClick={() => {
                    setOnRemoveClick({
                      id: item.id,
                      visible: true,
                      domainName: domainName,
                    });
                  }}
                  className={classes.button}
                  disabled={isEditing || isLiveStreaming}
                >
                  REMOVE
                </Button>
              </>
            )}
          </Box>
        </Box>
        <Box mt={1}>
          <TextField
            placeholder="Stream Key"
            fullWidth
            variant="filled"
            type="password"
            className={classes.root}
            disabled={!isSelfEditing}
            value={isSelfEditing ? editedStreamKey : item.streamKey}
            InputProps={{
              disableUnderline: true,
              classes: {
                root: classes.textField,
              },
            }}
            onChange={(e) => {
              setEditedStreamKey(e.target.value);
            }}
          />
          {editedStreamKeyErr && (
            <Typography variant="body2" style={{ color: "#D33730" }}>
              Please provide stream key
            </Typography>
          )}

          <TextField
            placeholder="Stream Url"
            fullWidth
            variant="filled"
            style={{ marginTop: "8px" }}
            className={classes.root}
            disabled={!isSelfEditing}
            value={isSelfEditing ? editedUrl : item.url}
            InputProps={{
              disableUnderline: true,
              classes: {
                root: classes.textField,
              },
            }}
            onChange={(e) => {
              setEditedUrl(e.target.value);
            }}
          />
          {editedUrlErr && (
            <Typography variant="body2" style={{ color: "#D33730" }}>
              Please provide stream url
            </Typography>
          )}
        </Box>
      </Box>

      <ConfirmBox
        open={onRemoveClick.visible}
        title={`${onRemoveClick.domainName} `}
        subTitle={"Are you sure want to remove this live stream configuration?"}
        successText={"OKAY"}
        onSuccess={() => {
          _handleRemove({ id: onRemoveClick.id });
          setOnRemoveClick({ visible: false });
        }}
        rejectText={"Cancel"}
        onReject={() => {
          setOnRemoveClick({
            visible: false,
            domainName: onRemoveClick.domainName,
          });
        }}
      />
      <ConfirmBox
        open={onCancelClick.visible}
        title={"Are you sure want to Cancel your changes?"}
        successText={"OKAY"}
        onSuccess={() => {
          setOnCancelClick({ visible: false });
          setIsEditingId(null);
        }}
        rejectText={"Cancel"}
        onReject={() => {
          setOnCancelClick({ visible: false });
        }}
      />
    </>
  );
};

const LiveStreamConfigTabPanel = ({ panelWidth, panelHeight }) => {
  const [editingItemId, setEditingItemId] = useState(null);

  const [streamKey, setStreamKey] = useState("");
  const [url, setStreamUrl] = useState("");
  const [streamKeyErr, setStreamKeyErr] = useState(false);
  const [streamUrlErr, setStreamUrlErr] = useState(false);
  const [isEditing, setIsEditing] = useState({ id: null, editing: false });
  const [isEditingId, setIsEditingId] = useState(null);

  const mMeeting = useMeeting({});
  const { liveStreamConfig, setLiveStreamConfig } = useMeetingAppContext();

  const isLiveStreaming = mMeeting?.isLiveStreaming;

  const liveStreamConfigRef = useRef();

  useEffect(() => {
    liveStreamConfigRef.current = liveStreamConfig;
  }, [liveStreamConfig]);

  const { publish } = usePubSub("LIVE_STREAM_CONFIG");

  const classes = useStyles();

  const _handleRemove = ({ id }) => {
    const liveStreamConfig = liveStreamConfigRef.current;

    const filtered = liveStreamConfig.filter(({ id: _id }) => {
      return id !== _id;
    });

    publish({ config: filtered }, { persist: true });
  };

  const handleValidation = () => {
    let isValid = true;
    if (streamKey.length === 0) {
      isValid = false;
      setStreamKeyErr(true);
      return false;
    } else {
      setStreamKeyErr(false);
    }
    if (url.length === 0) {
      isValid = false;
      setStreamUrlErr(true);
      return false;
    } else {
      setStreamUrlErr(false);
    }
    return isValid;
  };

  const _handleSave = ({ streamKey, url }) => {
    const liveStreamConfig = liveStreamConfigRef.current;
    liveStreamConfig.push({ id: getUniqueId(), streamKey, url });

    publish({ config: liveStreamConfig }, { persist: true });
    setStreamKey("");
    setStreamUrl("");
  };

  const rootDomain = extractRootDomain(url);
  const mainDomain = rootDomain?.split(".")[0];
  const domainName = mainDomain.charAt(0).toUpperCase() + mainDomain.slice(1);

  return (
    <Box
      style={{
        height: panelHeight - 32,
        overflowY: "auto",
        overflowX: "hidden",
      }}
    >
      <Box
        style={{
          overflowY: "auto",
          // height: panelHeight
        }}
      >
        {liveStreamConfig?.map((item) => {
          return (
            <>
              <SingleLiveStreamItem
                item={item}
                liveStreamConfig={liveStreamConfig}
                setLiveStreamConfig={setLiveStreamConfig}
                liveStreamConfigRef={liveStreamConfigRef}
                publish={publish}
                editingItemId={editingItemId}
                setEditingItemId={setEditingItemId}
                _handleRemove={_handleRemove}
                isEditingId={isEditingId}
                setIsEditingId={setIsEditingId}
                isLiveStreaming={isLiveStreaming}
              />
            </>
          );
        })}
      </Box>
      {!isLiveStreaming && (
        <Box
          style={{
            paddingRight: "12px",
            paddingLeft: "12px",
            paddingTop: "12px",
            paddingBottom: "12px",
          }}
        >
          <Box
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box style={{ display: "flex", flex: 1 }}>
              <Typography variant={"body1"} style={{ fontWeight: "bold" }}>
                {url ? domainName : "Platform Name"}
              </Typography>
            </Box>

            <Box
              style={{
                display: "flex",
                flex: 1,
                alignItems: "flex-end",
                justifyContent: "flex-end",
              }}
            >
              <Button
                variant="text"
                onClick={() => {
                  const isValid = handleValidation();
                  if (isValid) {
                    _handleSave({ streamKey: streamKey, url });
                  }
                }}
                className={classes.button}
              >
                ADD
              </Button>
            </Box>
          </Box>
          <Box mt={1}>
            <TextField
              placeholder="Stream Key"
              fullWidth
              variant="filled"
              type="password"
              className={classes.root}
              value={streamKey}
              InputProps={{
                disableUnderline: true,
                classes: {
                  root: classes.textField,
                },
              }}
              onChange={(e) => {
                setStreamKey(e.target.value);
              }}
            />
            {streamKeyErr && (
              <Typography variant="body2" style={{ color: "#D33730" }}>
                Please provide stream key
              </Typography>
            )}
            <TextField
              placeholder="Stream Url"
              fullWidth
              variant="filled"
              style={{ marginTop: "8px" }}
              className={classes.root}
              value={url}
              InputProps={{
                disableUnderline: true,
                classes: {
                  root: classes.textField,
                },
              }}
              onChange={(e) => {
                setStreamUrl(e.target.value);
              }}
            />
            {streamUrlErr && (
              <Typography variant="body2" style={{ color: "#D33730" }}>
                Please provide stream url
              </Typography>
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default LiveStreamConfigTabPanel;
