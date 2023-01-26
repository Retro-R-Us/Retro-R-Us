import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Account = (props) => {
    const {} = props;

    return (
        <div className="accountContainer">
            <div class="ui special cards">
                <div class="card">
                    <div class="blurring dimmable image">
                        <div class="ui dimmer">
                            <div class="content">
                                <div class="center">
                                    <div class="ui inverted button">Add Friend</div>
                                </div>
                            </div>
                        </div>
                        <img src="/images/avatar/large/elliot.jpg" />
                    </div>
                    <div class="content">
                        <a class="header">Team Fu</a>
                        <div class="meta">
                            <span class="date">Created in Sep 2014</span>
                        </div>
                    </div>
                    <div class="extra content">
                        <a>
                            <i class="users icon"></i>2 Members
                        </a>
                    </div>
                </div>
                <div class="card">
                    <div class="blurring dimmable image">
                        <div class="ui inverted dimmer">
                            <div class="content">
                                <div class="center">
                                    <div class="ui primary button">Add Friend</div>
                                </div>
                            </div>
                        </div>
                        <img src="/images/avatar/large/jenny.jpg" />
                    </div>
                    <div class="content">
                        <a class="header">Team Hess</a>
                        <div class="meta">
                            <span class="date">Created in Aug 2014</span>
                        </div>
                    </div>
                    <div class="extra content">
                        <a>
                            <i class="users icon"></i>2 Members
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};
