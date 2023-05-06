// Copyright Abridged, Inc. 2022. All Rights Reserved.
// Node module: @collabland/core-ui
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

export interface IPopupModalProps {
  width?: string;
  height?: string;
  title?: string;
  children: React.ReactNode;
  handelClose: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}