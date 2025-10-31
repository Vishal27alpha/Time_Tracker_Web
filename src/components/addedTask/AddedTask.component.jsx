import React from 'react';
import { useDispatch } from 'react-redux';
import { removeTask, pauseTask, startTask, completeTask } from '../../redux/task/Task.action';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import CancelIcon from '@material-ui/icons/Cancel';
import Tooltip from '@material-ui/core/Tooltip';

const AddedTask = ({ completed, bgColor, taskName, paused, percentage, type, time }) => {
    const dispatch = useDispatch();

    let backgrouColorForStart = "#e0e0de";
    if (paused === false) {
        backgrouColorForStart = "#c1edb4";
    }

    const containerStyle = {
        position: 'relative',
        height: '15%',
        width: '100%',
        backgroundColor: backgrouColorForStart,
        borderRadius: '10px',
        marginTop: 5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        overflow: 'hidden',
    };

    const fillerStyle = {
        height: '100%',
        width: `${percentage}%`,
        backgroundColor: `${bgColor}`,
        borderRadius: '5px',
        transition: 'width 1s ease-in-out',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 0,
    };

    const textContainerStyle = {
        position: 'relative',
        zIndex: 2,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 1vw',
        fontWeight: 'bold',
        color: 'black',
    };

    const taskNameStyle = {
        flex: 1,
        textAlign: 'left',
        fontWeight: 'bold',
    };

    const timePercentStyle = {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: '0.5rem',
        fontWeight: 'bold',
    };

    const iconsListStyle = {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: '0.5rem',
        marginLeft: '1vw',
    };

    const timeString = `${time[0]}${time[1]}:${time[2]}${time[3]}:${time[4]}${time[5]}`;

    return (
        <Tooltip title={taskName.toUpperCase()} placement="right-start" arrow>
            <div className="taskMainContainer" style={containerStyle}>
                <div className="contentContainer" style={fillerStyle}></div>

                <div style={textContainerStyle}>
                    <div className="taskName" style={taskNameStyle}>
                        {`${taskName.toUpperCase().slice(0, 14)}${taskName.length > 14 ? '...' : ''}`}
                    </div>

                    <div style={timePercentStyle}>
                        <span>{timeString}</span>
                        <span>-</span>
                        <span>{`${percentage}%`}</span>
                    </div>

                    {!completed && type !== 'remainder' && (
                        <div className="iconsList" style={iconsListStyle}>
                            {paused ? (
                                type !== 'remainder' && (
                                    <Tooltip title={`Start ${taskName.toUpperCase()}`} arrow>
                                        <div className="playButton">
                                            <PlayCircleOutlineIcon
                                                key={`${taskName}-playBtn`}
                                                onClick={() => dispatch(startTask(taskName))}
                                            />
                                        </div>
                                    </Tooltip>
                                )
                            ) : (
                                type !== 'remainder' && (
                                    <Tooltip title={`Pause ${taskName.toUpperCase()}`} arrow>
                                        <div className="pauseButton">
                                            <PauseCircleOutlineIcon
                                                key={`${taskName}-pauseBtn`}
                                                onClick={() => dispatch(pauseTask(taskName))}
                                            />
                                        </div>
                                    </Tooltip>
                                )
                            )}

                            {type === 'task' && (
                                <Tooltip title={`Mark Complete ${taskName.toUpperCase()}`} arrow>
                                    <div className="completedButton">
                                        <DoneOutlineIcon onClick={() => dispatch(completeTask(taskName))} />
                                    </div>
                                </Tooltip>
                            )}

                            {type !== 'break' && (percentage <= 0 || type === 'remainder') && (
                                <Tooltip title={`Remove ${taskName.toUpperCase()}`} arrow>
                                    <div className="removeButton">
                                        <CancelIcon
                                            key={`${taskName}-cancelBtn`}
                                            onClick={() => dispatch(removeTask(taskName))}
                                        />
                                    </div>
                                </Tooltip>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </Tooltip>
    );
};

export default React.memo(AddedTask);
